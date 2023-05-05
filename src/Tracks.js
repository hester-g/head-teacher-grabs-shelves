import React, { useState } from 'react'
import { useTracks } from './tracks-context'
import CoverImage from './CoverImage'
import BasicList from './BasicList'
import Hangman from './Hangman'
import Wallpaper from './Wallpaper'
import Button from 'react-bootstrap/Button'

const asDisplayTrack = (track, index) => ({
  src: track.album.images[0].url,
  title: track.name,
  subtitle: track.artists.map(artist => artist.name).join(', '),
  position: index + 1
})

const asMultipleTrackComponent =
  Component =>
  ({ tracks }) =>
    tracks.map((track, index) => (
      <Component key={index} {...asDisplayTrack(track, index)} />
    ))

const displayModeMap = {
  CoverImage: asMultipleTrackComponent(CoverImage),
  Wallpaper: asMultipleTrackComponent(Wallpaper),
  BasicList: asMultipleTrackComponent(BasicList),
  Hangman: Hangman
}

export function Tracks ({ style }) {
  const { tracks } = useTracks()
  const [displayMode, setDisplayMode] = useState('Hangman')

  if (!tracks) {
    return
  }

  const DisplayComponent =
    displayModeMap[displayMode] || displayModeMap.CoverImage

  return (
    <div style={style}>
      <DisplayComponent tracks={tracks} />
    </div>
  )
}
