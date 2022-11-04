import React, { useCallback } from 'react'
import { useAuthToken } from './auth-context'
import Button from 'react-bootstrap/Button'
import { useTracks } from './tracks-context'

function getHashParams () {
  let hashParams = {}
  let e, r = /([^&;=]+)=?([^&;]*)/g,
    q = window.location.hash.substring(1)
  while (e = r.exec(q)) {
    hashParams[e[1]] = decodeURIComponent(e[2])
  }
  return hashParams
}

const login = () => {
  let client_id = '' // Your client id
  let redirect_uri = window.location.origin // Your redirect uri

  let state = 'somethingsomething'

  // localStorage.setItem(stateKey, state);
  let scope = 'user-read-playback-state user-read-currently-playing playlist-read-private playlist-read-collaborative user-read-playback-position user-top-read user-read-recently-played user-library-read user-read-email user-read-private'

  let url = 'https://accounts.spotify.com/authorize'
  url += '?response_type=token'
  url += '&client_id=' + encodeURIComponent(client_id)
  url += '&scope=' + encodeURIComponent(scope)
  url += '&redirect_uri=' + encodeURIComponent(redirect_uri)
  url += '&state=' + encodeURIComponent(state)

  window.location = url
}

export function Auth () {
  const { token, setToken, resetToken } = useAuthToken()
  const { resetTracks } = useTracks()

  const logout = useCallback(() => {
    resetToken()
    resetTracks()
  }, [resetToken, resetTracks])

  React.useEffect(() => {
    if (!token) {
      let params = getHashParams()
      let accessToken = params.access_token

      if (accessToken) {
        setToken(accessToken)
        window.location = window.location.origin
      }
    }
  }, [token])

  return token
    ? <Button variant="secondary" onClick={logout}>Logout</Button>
    : <Button variant="secondary" onClick={login}>Login</Button>
}
