import axios from 'axios'
import { useState } from 'react'
import { Auth } from './Auth'
import { AuthProvider, useAuthToken } from './auth-context'


const Tracks = () => {
  const { token } = useAuthToken()
  const [topTracks, setTopTracks] = useState([])

  if (token) {
    axios.get('https://api.spotify.com/v1/me/top/tracks?time_range=long_term&limit=50', {
      headers: {
        Authorization: 'Bearer ' + token
      }
    })
    .then(response => setTopTracks(response.data.items))
    .catch(response => console.log(response))
  }

  return topTracks.map(track => <img src={track.album.images[2].url} />)
}

export function App () {
  const [username, setUsername] = useState(false)

  return <>
    <h1>Hello world!</h1>
    {/*{username || 'no username :('}*/}
    <AuthProvider>
      <Tracks />
      <br />
      <Auth />
    </AuthProvider>
  </>
}
