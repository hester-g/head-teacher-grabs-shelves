import React from 'react'
import Image from 'react-bootstrap/Image'
import Button from 'react-bootstrap/Button'
import axios from 'axios'
import { useAuthToken } from './auth-context'

const CoverImage = ({ src, title, subtitle, position, uri }) => {
  const colour = position/50 * 360
  const backgroundBackgroundColour = !src ? {background: 'linear-gradient(90deg, hsla(' + colour + ', 100%, 50%, 0.8) 0%, hsla(' + colour + ', 80%, 80%, 0.8) 100%)'} : {}
  const backgroundImage = src ? {src} : {}

  const { token } = useAuthToken()

  const switchToSong = () => {
    axios.put(
      'https://api.spotify.com/v1/me/player/play',
      {
        uris: [uri],
        position_ms: 0
      },
      {
        headers: {
          Authorization: 'Bearer ' + token
        }
      }
    )
  }

  return <>
    <Button onClick={switchToSong}>hello</Button>
    <div id={position} style={{ position: 'relative', overflow: 'hidden', height: '100vh' }}>
    <Image
      {...backgroundImage}
      style={{
        ...backgroundBackgroundColour,
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
      <Image {...backgroundImage} style={{ maxWidth: '80vh' }}/>
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
          <span style={{fontSize: '4rem'}}>{subtitle}</span>
        </div>
        <div style={{fontSize: '4rem'}}>
          <span style={{backgroundColor: 'rgba(30, 30, 30, 0.5)', paddingRight: 'calc(50vh - 320px)', paddingLeft: 'calc(50vh - 320px)'}}>#{position}</span>
        </div>
      </div>
    </div>
  </div>
  </>
}

export default CoverImage
