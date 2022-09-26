import axios from 'axios'
import React from 'react'
import { useAuthToken } from './auth-context'
import Image from 'react-bootstrap/Image'
import { useTracks } from './tracks-context'

const CoverImage = ({ src, title, artist }) => {
  return <div style={{ position: 'relative', overflow: 'hidden', height: '100vh' }}>
    <Image
      src={src}
      style={{
        position: 'absolute',
        height: '120vh',
        width: '120vw',
        top: '-10vh',
        left: '-10vw',
        objectFit: 'cover',
        filter: 'blur(50px)'
      }}
    />
    <div style={{
      paddingLeft: 'calc(50vh - 320px)',
      maxHeight: '80vh',
      display: 'flex',
      justifyContent: 'space-between',
      position: 'relative',
      width: '100vw',
      top: 'calc(50vh - 320px)',
      left: '0'
    }}>
      <Image src={src} style={{ maxWidth: '80vh' }}/>
      <div style={{
        paddingRight: 'calc(50vh - 320px)',
        fontFamily: 'Bebas Neue, cursive',
        fontSize: '5rem',
        textAlign: 'right',
        color: 'white'
      }}>
        {/*<span style={{background: 'rgba(105, 105, 105, 0.5)', height: '5rem'}}>{title}</span>*/}
        {title}
      </div>
    </div>
  </div>
}

export function Tracks ({ style }) {
  const { token } = useAuthToken()
  const { tracks, setTracks } = useTracks()

  if (tracks.length === 0) {
    if (token) {
      axios.get('https://api.spotify.com/v1/me/top/tracks?time_range=long_term&limit=50', {
        headers: {
          Authorization: 'Bearer ' + token
        }
      })
      .then(response => setTracks(response.data.items))
      .catch(response => console.log(response))
    } else {
      return
    }
  }

  return <div style={style}>
      {tracks.map(track => <CoverImage src={track.album.images[0].url} title={track.name}/>)}
    </div>
}
