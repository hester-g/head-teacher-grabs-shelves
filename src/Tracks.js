import axios from 'axios'
import React from 'react'
import { useAuthToken } from "./auth-context"

export function Tracks () {
  const { token } = useAuthToken()
  const [topTracks, setTopTracks] = React.useState([])

  if (token) {
    axios.get('https://api.spotify.com/v1/me/top/tracks?time_range=long_term&limit=50', {
      headers: {
        Authorization: 'Bearer ' + token
      }
    })
    .then(response => setTopTracks(response.data.items))
    .catch(response => console.log(response))
  } else {
    return
  }

  return topTracks.map(track => <img src={track.album.images[2].url} />)
}
