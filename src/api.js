import axios from 'axios'
import { useAuthToken } from './auth-context'

const { token } = useAuthToken()

const getTop = (timeframe, type) => token && axios
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

export default getTop
