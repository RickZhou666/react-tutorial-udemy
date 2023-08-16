import axios from 'axios'

import jwt from 'jsonwebtoken'
import serverData from 'utils/server-data'

axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'
const api = axios.create({
  baseURL: `/compargusnodeweb/api/`,
  responseType: 'json',
})

api.interceptors.request.use(
  function(config) {
    // Do something before request is sent
    //if(store.state.auth.userId){
    // let content = { userId: 'danglin' }
    // let token = jwt.sign(content, '80fd108a3d7a5a3c4e2cd0c4da36c943099e006e')
    let token = document.cookie
      .split(';')
      .find(e => e.includes('compargus_token'))
      .replace('compargus_token=', '')
      .replace(/\s+/g, '')

    config.headers.Authorization = token
    config.headers['X-CSRF-Token'] = serverData._csrf
    //}
    return config
  },
  function(err) {
    // Do something with request error
    return Promise.reject(err)
  },
)
api.interceptors.response.use(
  function(response) {
    return response
  },
  function(err) {
    if (err && err.response && err.response.status === 401) {
      err.message = 'Your SSO session has expired, please relogin'
      location.reload()
    }
    throw err
  },
)
export default api
