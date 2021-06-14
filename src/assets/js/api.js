import axios from 'axios'


const api = axios.create({
})
api.defaults.withCredentials = true
api.defaults.headers.common['client-type'] = 'ajax'

export default {
  api,
  testGet (url) {
    return api({
      method: 'get',
      url: `/rest/${url}`
    })
  }
}