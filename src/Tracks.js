import axios from 'axios'
import React from 'react'
import { useAuthToken } from './auth-context'
import Image from 'react-bootstrap/Image'

const CoverImage = ({ src }) => <div style={{position: 'relative', overflow: 'hidden', height: '100vh', width: '100vw'}}>
  <Image
    src={src}
    style={{position: 'absolute', height: '120vh', width: '120vw', top: '-10vh', left: '-10vw', objectFit: 'cover', filter: 'blur(50px)'}}
  />
  <Image src={src} style={{position: 'relative', top: 'calc(50vh - 320px)', left: 'calc(50vw - 320px)'}}/>
</div>


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
      {topTracks.map(track => <CoverImage src={track.album.images[0].url} />)}
    </div>
}
