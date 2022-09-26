import React, { useCallback } from 'react'

export function useLocalStorageState (key, defaultValue = '') {
  const [state, setState] = React.useState(
    () => JSON.parse(window.localStorage.getItem(key)) || defaultValue
  )

  const reset = useCallback(() => {
    setState(defaultValue)
  }, [setState, defaultValue])

  React.useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(state))
  }, [key, state])

  return [state, setState, reset]
}
