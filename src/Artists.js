import React from 'react'
import { useTracks } from './tracks-context'
import CoverImage from './CoverImage'

export function Artists ({ style }) {
  const { artists } = useTracks()

  if (!artists) {
    return
  }

  return <div style={style}>
    {artists.map((artist, index) => {
      return <CoverImage
        key={index}
        src={artist.images[0]?.url}
        title={artist.name}
        subtitle={artist.genres.join(', ')}
        position={index+1}
      />}
    )}
  </div>
}
