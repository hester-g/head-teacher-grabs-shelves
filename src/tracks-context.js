import React, { useEffect, useState } from 'react'
import { useLocalStorageState } from './useLocalStorage'
import axios from 'axios'
import { useAuthToken } from './auth-context'

const TracksContext = React.createContext()

const timeframeMap = {
  short_term: 'Short',
  medium_term: 'Medium',
  long_term: 'Long'
}

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
  const [timeframe, setTimeframe] = useState('long_term')

  const resetTracksAndArtists = () => {
    resetTracks()
    resetArtists()
  }

  const value = {
    tracks: tracks[timeframe],
    artists: artists[timeframe],
    resetTracksAndArtists: resetTracksAndArtists,
    setTimeframeShort: () => setTimeframe('short_term'),
    setTimeframeMedium: () => setTimeframe('medium_term'),
    setTimeframeLong: () => setTimeframe('long_term'),
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
