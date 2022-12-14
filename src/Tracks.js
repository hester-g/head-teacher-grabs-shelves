import axios from 'axios'
import React from 'react'
import { useAuthToken } from './auth-context'
import Image from 'react-bootstrap/Image'
import { useTracks } from './tracks-context'

const CoverImage = ({ src, title, artist, position }) => {
  return <div id={position} style={{ position: 'relative', overflow: 'hidden', height: '100vh' }}>
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
      marginRight: 'calc(50vh - 320px)',
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
        fontFamily: 'Bebas Neue, cursive',
        textAlign: 'right',
        color: 'white',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between'
        // webkitTextStroke: '1px black' - text outline
      }}>
        <div style={{backgroundColor: 'rgba(30, 30, 30, 0.5)', display:'block', paddingRight: 'calc(50vh - 320px)', paddingLeft: 'calc(50vh - 320px)'}}>
          <span style={{fontSize: '5rem'}}>{title}</span>
          <br />
          <span style={{fontSize: '4rem'}}>{artist}</span>
        </div>
        <div style={{fontSize: '4rem'}}>
          <span style={{backgroundColor: 'rgba(30, 30, 30, 0.5)', paddingRight: 'calc(50vh - 320px)', paddingLeft: 'calc(50vh - 320px)'}}>#{position}</span>
        </div>
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
      {tracks.map((track, index) =>
        <CoverImage
          key={index}
          src={track.album.images[0].url}
          title={track.name}
          artist={track.artists.map(artist => artist.name).join(', ')}
          position={index+1}
        />
      )}
    </div>
}
