import React from 'react'
import { useLocalStorageState } from './useLocalStorage'

const TracksContext = React.createContext()

function TracksProvider ({ children }) {
  const [tracks, setTracks, reset] = useLocalStorageState('top_tracks', [])

  const value = {
    tracks: tracks,
    setTracks: setTracks,
    resetTracks: reset
  }

  return <TracksContext.Provider value={value}>{children}</TracksContext.Provider>
}

function useTracks () {
  const context = React.useContext(TracksContext)

  if (context === undefined) {
    throw new Error('useTracks must be used within an TracksProvider')
  }

  return context
}

export { TracksProvider, useTracks }
