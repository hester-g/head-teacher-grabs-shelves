import React from 'react'

const AuthContext = React.createContext()

function AuthProvider({ children }) {
  const [token, setToken] = React.useState('')

  const value = {
    token: token,
    setToken: setToken
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

function useAuthToken() {
  const context = React.useContext(AuthContext)

  if (context === undefined) {
    throw new Error('useAuthToken must be used within an AuthProvider')
  }

  return context
}

export {AuthProvider, useAuthToken}
