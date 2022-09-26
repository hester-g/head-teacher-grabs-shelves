import axios from 'axios'
import { useState } from 'react'

function getHashParams () {
  let hashParams = {}
  let e, r = /([^&;=]+)=?([^&;]*)/g,
    q = window.location.hash.substring(1)
  while (e = r.exec(q)) {
    hashParams[e[1]] = decodeURIComponent(e[2])
  }
  return hashParams
}

const logIn = () => {
  let client_id = 'bd1520ae2c17407ab801c59a39447ef7' // Your client id
  let redirect_uri = window.location // Your redirect uri

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

export function App () {
  const [username, setUsername] = useState(false)
  const [topTracks, setTopTracks] = useState([])

  let params = getHashParams()
  let accessToken = params.access_token

  if (accessToken) {
    axios.get('https://api.spotify.com/v1/me/top/tracks?time_range=long_term&limit=50', {
      headers: {
        Authorization: 'Bearer ' + accessToken
      }
    })
    .then(response => setTopTracks(response.data.items))
    .catch(response => console.log(response))
  }


  return <>
    <h1>Hello world!</h1>
    {/*{username || 'no username :('}*/}
    { topTracks.map(track => <img src={track.album.images[2].url} />) }
    <br />
    { accessToken ? <p>logged in</p> : <button onClick={logIn}>Log In Or Something!</button> }
  </>
}
