import React from 'react'
import Button from 'react-bootstrap/Button'
import { useTracks } from './tracks-context'

export default function TimeSelector () {
  const { setTimeframeShort, setTimeframeMedium, setTimeframeLong } = useTracks()
  return <>
      <Button onClick={setTimeframeShort}>Short</Button>
      <Button onClick={setTimeframeMedium}>Medium</Button>
      <Button onClick={setTimeframeLong}>Long</Button>
    </>
}