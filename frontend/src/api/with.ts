import { baseURL } from 'app/apiAxios'
import axios, { AxiosInstance } from 'axios'
import { WithCorpType } from 'types/types'

const authAxios: AxiosInstance = axios.create({
  baseURL: baseURL,
})

export const getWithMainInfoAPI = async () => {
  const withMainInfoList: WithCorpType[] = []

  const response = {
    isNotFound404: false,
    data: withMainInfoList,
  }

  await authAxios
    .get('/with/nomember/corps')
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

export const getWithSpecificInfoAPI = async (corpId?: string) => {
  const withSpecificInfo: WithCorpType = {
    image: '',
    info: '',
    isBookmarked: false,
    nameEn: '',
    nameKr: '',
    teamNameEn: '',
    teamNameKr: '',
    url: '',
    content: '',
    branches: [],
    categories: [],
    cultures: [],
    tools: [],
  }

  const response = {
    isNotFound404: false,
    data: withSpecificInfo,
  }

  await authAxios
    .get(`/with/nomember/corps/${corpId}`)
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
