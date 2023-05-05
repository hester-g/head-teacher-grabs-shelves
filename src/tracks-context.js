import React, { useEffect, useState } from 'react'
import { useLocalStorageState } from './useLocalStorage'
import timeframeMap, { longTerm, mediumTerm, shortTerm } from './times'
import getTop from './api'

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
    if (!tracks[timeframe]) {
      getTop(timeframe, 'tracks').then(response => setTracks(tracks => ({...tracks, [timeframe]: response.data.items})))
    }

    if (!artists[timeframe]) {
      getTop(timeframe, 'artists').then(response => setArtists(artists => ({...artists, [timeframe]: response.data.items})))
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
