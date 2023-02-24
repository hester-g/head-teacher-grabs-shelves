import React from 'react'
import { useTracks } from './tracks-context'
import CoverImage from './CoverImage'

export function Tracks ({ style }) {
  const { tracks } = useTracks()

  if (!tracks) {
    return
  }

  return (
    <div style={style}>
      {tracks.map((track, index) => (
        <CoverImage
          key={index}
          src={track.album.images[0].url}
          title={track.name}
          subtitle={track.artists.map(artist => artist.name).join(', ')}
          position={index + 1}
        />
      ))}
    </div>
  )
}
