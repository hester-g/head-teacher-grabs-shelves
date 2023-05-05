import React from 'react'
import { useTopData } from './top-data-context'
import CoverImage from './CoverImage'

export function Artists ({ style }) {
  const { artists } = useTopData()

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
