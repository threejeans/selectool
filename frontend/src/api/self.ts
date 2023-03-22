import { ToolType } from '../types/types'
import axios, { AxiosInstance } from 'axios'
import { baseURL } from 'app/apiAxios'
import { SelfMainInfo } from 'types/types'

const authAxios: AxiosInstance = axios.create({
  baseURL: baseURL,
})

export const getSelfMainInfoAPI = async () => {
  const selfMainInfoList: SelfMainInfo[] = []
  const response = {
    isNotFound404: false,
    data: selfMainInfoList,
  }

  await authAxios
    .get('/self/nomember/tools')
    .then(res => {
      response.data = res.data
    })
    .catch(err => {
      console.log(err)
      if (err.request.status === 404) {
        response.isNotFound404 = true
      }
    })

  return response
}

export const getSelfSpecificInfoAPI = async (id?: string) => {
  const selfSpecificInfo: ToolType = {
    nameKr: '',
    nameEn: '',
    info: '',
    msg: '',
    topic: '',
    categories: [],
    country: '',
    image: '',
    url: '',
    toolFunctions: [],
    clients: [],
    trial: false,
    plans: [],
    aos: '',
    ios: '',
  }

  const response = {
    isNotFound404: false,
    data: selfSpecificInfo,
  }

  await authAxios
    .get(`/self/nomember/tools/${id}`)
    .then(res => {
      response.data = res.data
    })
    .catch(err => {
      console.log(err)
      if (err.request.status === 404) {
        response.isNotFound404 = true
      }
    })

  return response
}
