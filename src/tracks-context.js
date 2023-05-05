import React, { useEffect, useState } from 'react'
import { useLocalStorageState } from './useLocalStorage'
import axios from 'axios'
import { useAuthToken } from './auth-context'
import timeframeMap, { longTerm, mediumTerm, shortTerm } from './times'

const TracksContext = React.createContext()

function TracksProvider ({ children }) {
  const [tracks, setTracks, resetTracks] = useLocalStorageState(
    'top_tracks',
    {}
  )
  const [artists, setArtists, resetArtists] = useLocalStorageState(
    'top_artists',
    {}
  )
  const { token } = useAuthToken()
  const [timeframe, setTimeframe] = useState(shortTerm)

  const resetTracksAndArtists = () => {
    resetTracks()
    resetArtists()
  }

  const value = {
    tracks: tracks[timeframe],
    artists: artists[timeframe],
    resetTracksAndArtists: resetTracksAndArtists,
    setTimeframeShort: () => setTimeframe(shortTerm),
    setTimeframeMedium: () => setTimeframe(mediumTerm),
    setTimeframeLong: () => setTimeframe(longTerm),
    getTimeframe: timeframeMap[timeframe]
  }

  useEffect(() => {
    if (token) {
      if (!tracks[timeframe]) {
        axios
          .get(
            'https://api.spotify.com/v1/me/top/tracks?time_range=' +
              timeframe +
              '&limit=50',
            {
              headers: {
                Authorization: 'Bearer ' + token
              }
            }
          )
          .then(response => setTracks(tracks => ({...tracks, [timeframe]: response.data.items})))
          .catch(response => console.error(response))
      }

      if (!artists[timeframe]) {
        axios
          .get(
            'https://api.spotify.com/v1/me/top/artists?time_range=' +
              timeframe +
              '&limit=50',
            {
              headers: {
                Authorization: 'Bearer ' + token
              }
            }
          )
          .then(response => setArtists(artists => ({...artists, [timeframe]: response.data.items})))
          .catch(response => console.error(response))
      }
    }
  }, [timeframe])

  return (
    <TracksContext.Provider value={value}>{children}</TracksContext.Provider>
  )
}

function useTracks () {
  const context = React.useContext(TracksContext)

  if (context === undefined) {
    throw new Error('useTracks must be used within an TracksProvider')
  }

  return context
}

export { TracksProvider, useTracks }
