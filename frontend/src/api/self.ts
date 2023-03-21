import { ToolType } from '../types/types'
import axios, { AxiosInstance } from 'axios'
import { baseURL } from 'app/apiAxios'
import { SelfMainInfo } from 'types/types'

const authAxios: AxiosInstance = axios.create({
  baseURL: baseURL,
})

export const getSelfMainInfoAPI = async () => {
  let selfMainInfoList: SelfMainInfo[] = []

  await authAxios
    .get('/self/nomember/tools')
    .then(res => {
      selfMainInfoList = res.data
    })
    .catch(err => {
      console.log(err)
    })

  return selfMainInfoList
}

export const getSelfSpecificInfoAPI = async (id?: string) => {
  let selfSpecificInfo: ToolType = {
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

  await authAxios
    .get(`/self/nomember/tools/${id}`)
    .then(res => {
      selfSpecificInfo = res.data
    })
    .catch(err => {
      console.log(err)
    })

  return selfSpecificInfo
}
