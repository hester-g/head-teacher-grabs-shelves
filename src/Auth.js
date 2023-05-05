import React from 'react'
import { useLogin } from './login-context'
import Nav from 'react-bootstrap/Nav'

export function Auth () {
  const { loggedIn, login, logout } = useLogin()
  return loggedIn
    ? <Nav.Link onClick={logout}>Logout</Nav.Link>
    : <Nav.Link onClick={login}>Login</Nav.Link>
}
