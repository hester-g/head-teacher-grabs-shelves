import React from 'react'
import { useTracks } from './tracks-context'
import NavDropdown from 'react-bootstrap/NavDropdown'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import timeframeMap, { shortTerm, mediumTerm, longTerm } from './times'

export default function TimeSelector () {
  const { setTimeframeShort, setTimeframeMedium, setTimeframeLong, getTimeframe } = useTracks()
  return <NavDropdown id="dropdown-basic-button" title={getTimeframe} as={ButtonGroup}>
    <NavDropdown.Item as="button" onClick={setTimeframeShort}>{timeframeMap[shortTerm]}</NavDropdown.Item>
    <NavDropdown.Item as="button" onClick={setTimeframeMedium}>{timeframeMap[mediumTerm]}</NavDropdown.Item>
    <NavDropdown.Item as="button" onClick={setTimeframeLong}>{timeframeMap[longTerm]}</NavDropdown.Item>
  </NavDropdown>
}
