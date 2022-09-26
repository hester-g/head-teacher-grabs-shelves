import React from 'react'
import { useLocalStorageState } from './useLocalStorage'

const AuthContext = React.createContext()

function AuthProvider ({ children }) {
  const [token, setToken, resetToken] = useLocalStorageState('spotify_access_token', '')

  const value = {
    token: token,
    setToken: setToken,
    resetToken: resetToken
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

function useAuthToken () {
  const context = React.useContext(AuthContext)

  if (context === undefined) {
    throw new Error('useAuthToken must be used within an AuthProvider')
  }

  return context
}

export { AuthProvider, useAuthToken }
