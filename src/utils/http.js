import axios from 'axios'
import httpAdapter from 'axios/lib/adapters/http'
import { AsyncStorage } from 'react-native'
import ENV from '../../env'

const instance = axios.create({
  baseURL: ENV().apiUrl,
  adapter: httpAdapter
})

instance.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem('token')
    config.contentType = 'application/json'

    if (token) {
      config.headers.authorization = `Bearer ${token}`
    }

    return config
  },
  (error) => Promise.reject(error)
)

export const apiUrls = {
  item: {
    create: '/item',
    get: '/item'
  },
  chat: {
    login: '/firebase'
  }
}

export default instance
