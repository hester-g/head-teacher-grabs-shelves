import React, { useEffect, useState } from 'react'
import { useLocalStorageState } from './useLocalStorage'
import timeframeMap, { longTerm, mediumTerm, shortTerm } from './times'
import getTopData from './api'
import { useAuthToken } from './auth-context'

const TopDataContext = React.createContext()

function TopDataProvider ({ children }) {
  const [tracks, setTracks, resetTracks] = useLocalStorageState(
    'top_tracks',
    {}
  )
  const [artists, setArtists, resetArtists] = useLocalStorageState(
    'top_artists',
    {}
  )

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

  const { token } = useAuthToken()

  useEffect(() => {
    if (token) {
      if (!tracks[timeframe]) {
        getTopData(timeframe, 'tracks', token).then(response => setTracks(tracks => ({...tracks, [timeframe]: response.data.items})))
      }

      if (!artists[timeframe]) {
        getTopData(timeframe, 'artists', token).then(response => setArtists(artists => ({...artists, [timeframe]: response.data.items})))
      }
    }
  }, [timeframe])

  return (
    <TopDataContext.Provider value={value}>{children}</TopDataContext.Provider>
  )
}

function useTopData () {
  const context = React.useContext(TopDataContext)

  if (context === undefined) {
    throw new Error('useTopData must be used within a TopDataProvider')
  }

  return context
}

export { TopDataProvider, useTopData }
