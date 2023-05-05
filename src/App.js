import { useEffect, useState } from 'react'
import { AuthProvider } from './auth-context'
import { CustomNav } from './CustomNav'
import { Tracks } from './Tracks'
import { TopDataProvider } from './top-data-context'
import { LoginProvider, useLogin } from './login-context'
import TimeSelector from './TimeSelector'
import { Switch, Route, Redirect, Link } from 'react-router-dom'
import { Artists } from './Artists'
import Nav from 'react-bootstrap/Nav'

const Routes = () => {
  const { loggedIn } = useLogin()

  return (
    <Switch>
      <Route exact path='/'>
        {loggedIn ? <Redirect to='/tracks' /> : null}
      </Route>
      <Route path='/tracks'>
        <Tracks style={{ height: '100vh' }} />
      </Route>
      <Route path='/artists'>
        <Artists style={{ height: '100vh' }} />
      </Route>
    </Switch>
  )
}

export function App () {
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const originalKeydown = document.onkeydown || (() => {})

    document.onkeydown = e => {
      originalKeydown || originalKeydown(e)

      e = e || window.event

      if (e.keyCode == '37') {
        setCurrent(c => (c > 0 ? c - 1 : c))
      } else if (e.keyCode == '39') {
        setCurrent(c => c + 1)
      }
    }

    return () => {
      document.onkeydown = originalKeydown
    }
  }, [])

  useEffect(() => {
    window.location.hash = current > 0 ? current : ''
  }, [current])

  return (
    <>
      <AuthProvider>
        <TopDataProvider>
          <LoginProvider>
            <CustomNav>
              <Link to={'/artists'} component={Nav.Link}>Artists</Link>
              <Link to={'/tracks'} component={Nav.Link}>Tracks</Link>
              <TimeSelector />
            </CustomNav>
            <Routes />
          </LoginProvider>
        </TopDataProvider>
      </AuthProvider>
    </>
  )
}
