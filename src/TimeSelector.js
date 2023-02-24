import React from 'react'
import Button from 'react-bootstrap/Button'
import { useTracks } from './tracks-context'

export default function TimeSelector () {
  const { setTimeframe } = useTracks()
  return <>
      <Button onClick={() => setTimeframe('long_term')}>Long</Button>
      <Button onClick={() => setTimeframe('medium_term')}>Medium</Button>
      <Button onClick={() => setTimeframe('short_term')}>Short</Button>
    </>
}