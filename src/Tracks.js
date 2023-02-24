import React, { useState } from 'react'
import { useTracks } from './tracks-context'
import CoverImage from './CoverImage'
import BasicList from './BasicList'
import Button from 'react-bootstrap/Button'

const asMultipleTrackComponent =
  Component =>
  ({ tracks }) =>
    tracks.map((track, index) => (
      <Component
        key={index}
        src={track.album.images[0].url}
        title={track.name}
        subtitle={track.artists.map(artist => artist.name).join(', ')}
        position={index + 1}
      />
    ))

const displayModeMap = {
  CoverImage: asMultipleTrackComponent(CoverImage),
  BasicList: asMultipleTrackComponent(BasicList)
}

export function Tracks ({ style }) {
  const { tracks } = useTracks()
  const [displayMode, setDisplayMode] = useState('CoverImage')

  if (!tracks) {
    return
  }

  const DisplayComponent =
    displayModeMap[displayMode] || displayModeMap.CoverImage

  return (
    <div style={style}>
      <Button onClick={() => setDisplayMode('BasicList')}>?</Button>
      <DisplayComponent tracks={tracks} />
    </div>
  )
}
