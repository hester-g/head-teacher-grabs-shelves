import React, { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap'

const asDisplayTrack = (track, index) => ({
  src: track.album.images[0].url,
  title: track.name,
  subtitle: track.artists.map(artist => artist.name).join(', '),
  position: index + 1
})

const alphaRegex = /^[A-Za-z0-9]$/i

const letterStyle = { display: 'inline-block', width: '1.5rem', fontSize: '1rem', padding: '4px', margin: '2px', backgroundColor: '#eee', textAlign: 'center', fontFamily: 'monospace', 'textDecortion': 'underline 2px' }

const WordDisplay = ({ children, usedLetters, showAll }) => {
  const replacedWord = children.replaceAll(/\s/gi, '/').replaceAll(/\w/gi, m => usedLetters.includes(m.toLowerCase()) ? m : ' ')
  const completed = !replacedWord.includes(' ')
  const completedStyle = completed ? {backgroundColor: 'lime'} : {}
  const showAllStyle = showAll ? { backgroundColor: 'red'} : {}
  const word = showAll ? children : replacedWord

  return <>
    {word.split('').map(l => <span style={{ ...letterStyle, ...showAllStyle, ...completedStyle }}>{l}</span>)}
  </>
}

const Hangman = ({ tracks }) => {
  const [usedLetters, setUsedLetters] = useState([])
  const [trackNumber, setTrackNumber] = useState(0)
  const [roundComplete, setRoundComplete] = useState(false)

  const track = tracks.map(asDisplayTrack)[trackNumber]
  const wholeTitle = track.title.concat(track.subtitle).toLowerCase()
  const missedLetters = usedLetters.filter(letter => !wholeTitle.includes(letter))

  useEffect(() => {
    if (missedLetters.length > 5) {
      setRoundComplete(true)
    }
  }, [missedLetters])

  useEffect(() => {
    const originalKeydown = document.onkeydown || (() => {})

    document.onkeydown = e => {
      originalKeydown || originalKeydown(e)

      e = e || window.event

      if (alphaRegex.test(e.key)) {
        let key = e.key.toLowerCase()
        setUsedLetters(letters => letters.includes(key) ? [...letters] : [key, ...letters])
      }
    }

    return () => {
      document.onkeydown = originalKeydown
    }
  }, [])

  return (
    <div>
      {roundComplete && <div>Unlucky. The answer is</div>}
      <div>Missed {missedLetters}</div>
      <WordDisplay usedLetters={usedLetters} showAll={roundComplete}>
        {track.title}
      </WordDisplay> by{' '}
      <WordDisplay usedLetters={usedLetters} showAll={roundComplete}>
        {track.subtitle}
      </WordDisplay>
      <Button onClick={() => {
        setTrackNumber(c => c + 1)
        setUsedLetters(() => [])
        setRoundComplete(false)
      }}>next</Button>
    </div>
  )
}

export default Hangman
