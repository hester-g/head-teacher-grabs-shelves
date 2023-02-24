import React, { useEffect, useState } from 'react'
import { useLocalStorageState } from './useLocalStorage'
import axios from 'axios'
import { useAuthToken } from './auth-context'

const TracksContext = React.createContext()

function TracksProvider ({ children }) {
  const [tracks, setTracks, reset] = useLocalStorageState('top_tracks', [])
  const { token } = useAuthToken()
  const [timeframe, setTimeframe] = useState('long_term')

  const value = {
    tracks: tracks,
    resetTracks: reset,
    setTimeframe: setTimeframe,
  }

  useEffect(() => {
    console.log(timeframe)
    if (token) {
      axios.get('https://api.spotify.com/v1/me/top/tracks?time_range=' + timeframe + '&limit=50', {
        headers: {
          Authorization: 'Bearer ' + token
        }
      })
        .then(response => setTracks(response.data.items))
        .catch(response => console.log(response))
    }
  }, [timeframe])

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
