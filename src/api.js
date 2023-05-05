import React from 'react'
import axios from 'axios'

const getTopData = (timeframe, type, token) => {
  return axios
  .get(
    'https://api.spotify.com/v1/me/top/' + type + '?time_range=' + timeframe + '&limit=50',
    {
      headers: {
        Authorization: 'Bearer ' + token
      }
    }
  )
  .then(response => response)
  .catch(response => console.error(response))
}

export default getTopData
