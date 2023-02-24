import { useEffect, useState } from 'react'
import { Auth } from './Auth'
import { AuthProvider } from './auth-context'
import { Nav } from './Nav'
import { Tracks } from './Tracks'
import { TracksProvider } from './tracks-context'
import TimeSelector from './TimeSelector'

export function App () {
  const [current, setCurrent] = useState(0)
  const [username, setUsername] = useState(false)
  const [timeframe, setTimeframe] = useState('long_term')

  useEffect(() => {
    const originalKeydown = document.onkeydown || (() => {})

    document.onkeydown = (e) => {
      originalKeydown || originalKeydown(e)

      e = e || window.event

      if (e.keyCode == '37') {
        setCurrent((c) => c > 0 ? c - 1 : c)
      } else if (e.keyCode == '39') {
        setCurrent((c) => c + 1)
      }
    }

    return () => {
      document.onkeydown = originalKeydown
    }
  }, [])

  useEffect(() => {
    window.location.hash = current > 0 ? current : ''
  }, [current])

  return <>
    <TracksProvider>
      <AuthProvider>
        <Nav>
          <TimeSelector setTimeframe={setTimeframe} />
          <Auth />
        </Nav>
        <Tracks style={{height: '100vh'}} timeframe={timeframe} />
      </AuthProvider>
    </TracksProvider>
  </>
}
