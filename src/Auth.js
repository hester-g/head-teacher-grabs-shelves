import React from 'react'
import Button from 'react-bootstrap/Button'
import { useLogin } from './login-context'

export function Auth () {
  const { loggedIn, login, logout } = useLogin()
  return loggedIn
    ? <Button variant="secondary" onClick={logout}>Logout</Button>
    : <Button variant="secondary" onClick={login}>Login</Button>
}
