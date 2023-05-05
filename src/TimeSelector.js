import React from 'react'
import { useTracks } from './tracks-context'
import NavDropdown from 'react-bootstrap/NavDropdown'
import ButtonGroup from 'react-bootstrap/ButtonGroup'

export default function TimeSelector () {
  const { setTimeframeShort, setTimeframeMedium, setTimeframeLong, getTimeframe } = useTracks()
  return <NavDropdown id="dropdown-basic-button" title={getTimeframe} as={ButtonGroup}>
      <NavDropdown.Item as="button" onClick={setTimeframeShort}>Short</NavDropdown.Item>
      <NavDropdown.Item as="button" onClick={setTimeframeMedium}>Medium</NavDropdown.Item>
      <NavDropdown.Item as="button" onClick={setTimeframeLong}>Long</NavDropdown.Item>
    </NavDropdown>
}