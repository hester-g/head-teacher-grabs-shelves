import React, { useCallback, useEffect } from 'react'
import { useAuthToken } from './auth-context'
import { useTopData } from './top-data-context'
import axios from 'axios'
import { useLocalStorageState } from './useLocalStorage'
import { useHistory } from 'react-router-dom'

const LoginContext = React.createContext()

function getHashParams () {
  let hashParams = {}
  let e,
    r = /([^&;=]+)=?([^&;]*)/g,
    q = window.location.hash.substring(1)
  while ((e = r.exec(q))) {
    hashParams[e[1]] = decodeURIComponent(e[2])
  }
  return hashParams
}

const login = () => {
  let client_id = 'f20c0f4e184a4ca6a0e64fc91253b5e9' // Your client id
  let redirect_uri = window.location.origin // Your redirect uri

  let state = 'somethingsomething'

  // localStorage.setItem(stateKey, state);
  let scope =
    'user-read-playback-state user-read-currently-playing playlist-read-private playlist-read-collaborative user-read-playback-position user-top-read user-read-recently-played user-library-read user-read-email user-read-private'

  let url = 'https://accounts.spotify.com/authorize'
  url += '?response_type=token'
  url += '&client_id=' + encodeURIComponent(client_id)
  url += '&scope=' + encodeURIComponent(scope)
  url += '&redirect_uri=' + encodeURIComponent(redirect_uri)
  url += '&state=' + encodeURIComponent(state)
  url += '&show_dialog=true'

  window.location = url
}

function LoginProvider ({ children }) {
  const { token, setToken, resetToken } = useAuthToken()
  const { resetTracksAndArtists } = useTopData()
  const [user, setUser, resetUser] = useLocalStorageState('user', false)
  const history = useHistory()

  const logout = useCallback(() => {
    resetToken()
    resetTracksAndArtists()
    resetUser()
    history.push('')
  }, [resetToken, resetTracksAndArtists])

  useEffect(() => {
    if (!token) {
      let params = getHashParams()
      let accessToken = params.access_token

      if (accessToken) {
        setToken(accessToken)
        window.location = window.location.origin
      }
    }
  }, [token])

  useEffect(() => {
    if (token) {
      axios
        .get('https://api.spotify.com/v1/me', {
          headers: {
            Authorization: 'Bearer ' + token
          }
        })
        .then(response => setUser(response.data))
        .catch(response => console.error(response))
    }
  }, [token])

  const value = {
    loggedIn: !!token,
    user: user,
    login: login,
    logout: logout
  }

  return <LoginContext.Provider value={value}>{children}</LoginContext.Provider>
}

function useLogin () {
  const context = React.useContext(LoginContext)

  if (context === undefined) {
    throw new Error('useLogin must be used within a LoginProvider')
  }

  return context
}

export { LoginProvider, useLogin }
