import React from 'react'
import Image from 'react-bootstrap/Image'

const Wallpaper = ({ src, title, subtitle, position }) => {
  const colour = (position / 50) * 360
  const backgroundBackgroundColour = !src
    ? {
        background:
          'linear-gradient(90deg, hsla(' +
          colour +
          ', 100%, 50%, 0.8) 0%, hsla(' +
          colour +
          ', 80%, 80%, 0.8) 100%)'
      }
    : {}
  const backgroundImage = src ? { src } : {}
  return (
    <div
      id={position}
      style={{
        position: 'relative',
        overflow: 'hidden',
        height: '100vh',
        display: 'flex',
        alignItems: 'center'
      }}
    >
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
      <div
        style={{
          paddingLeft: 'calc(50vh - 320px)',
          marginRight: 'calc(50vh - 320px)',
          maxHeight: '80vh',
          display: 'flex',
          justifyContent: 'center',
          position: 'relative',
          width: '100vw',
          left: '0'
        }}
      >
        {/* <Image {...backgroundImage} style={{ maxWidth: '80vh' }} /> */}
      </div>
    </div>
  )
}

export default Wallpaper
