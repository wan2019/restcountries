import axios from 'axios'

const api = axios.create({
})
// eslint-disable-next-line
const host = process.env.VUE_APP_API_URL

export default {
  api,
  testGet (url) {
    return api({
      method: 'get',
      url: `${host}/rest/${url}`
    })
  }
}