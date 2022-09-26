import { useState } from 'react'
import { Auth } from './Auth'
import { AuthProvider } from './auth-context'
import { Tracks } from './Tracks'

export function App () {
  const [username, setUsername] = useState(false)

  return <>
    <h1>Hello world!</h1>
    {/*{username || 'no username :('}*/}
    <AuthProvider>
      <Auth />
      <br />
      <Tracks style={{height: '100vh'}}/>
    </AuthProvider>
  </>
}
