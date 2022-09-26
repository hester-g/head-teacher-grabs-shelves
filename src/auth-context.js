import React from 'react'

const AuthContext = React.createContext()

const useLocalStorageState = (key, defaultValue = '') => {
  const [state, setState] = React.useState(
    () => window.localStorage.getItem(key) || defaultValue
  )

  React.useEffect(() => {
    const setLastKey = () => {
      window.localStorage.setItem('lastKey', key)
      window.localStorage.setItem(key, state)
    }
    if (key !== window.localStorage.getItem('lastKey')) {
      const lastKey = localStorage.getItem('lastKey')
      window.localStorage.removeItem(lastKey)
      setLastKey()
    } else {
      setLastKey()
    }
  }, [key, state])

  return [state, setState]
}

function AuthProvider ({ children }) {
  const [token, setToken] = useLocalStorageState('spotify_access_token', '')

  const value = {
    token: token,
    setToken: setToken
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
