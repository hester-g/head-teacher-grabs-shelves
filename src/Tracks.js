import axios from 'axios'
import React from 'react'
import { useAuthToken } from './auth-context'
import Image from 'react-bootstrap/Image'

export function Tracks ({ style }) {
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

  return <div style={style}>
      {topTracks.map(track => <Image src={track.album.images[0].url} style={{minWidth: '100%'}} />)}
    </div>
}
