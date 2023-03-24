import { baseURL } from 'app/apiAxios'
import axios, { AxiosInstance } from 'axios'
import { WithCorpType } from 'types/types'

const basicAxios: AxiosInstance = axios.create({
  baseURL: baseURL,
})

export const getWithMainInfoAPI = async () => {
  const withMainInfoList: WithCorpType[] = []

  const response = {
    isNotFound404: false,
    data: withMainInfoList,
  }

  await basicAxios
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

export const getWithSearchListAPI = async (value: string) => {
  const withMainInfoList: WithCorpType[] = []
  const response = {
    statusCode: 200,
    data: withMainInfoList,
  }
  await basicAxios
    .get('/with/nomember/corps', { params: { name: value } })
    .then(res => {
      response.data = res.data
      if (!res.data.length) {
        response.statusCode = 400
      }
    })
    .catch(err => {
      console.log(err)
      if (err.request.status === 404) {
        response.statusCode = 404
      }
    })

  return response
}

export const getWithCategoryListAPI = async (params: string) => {
  const withMainInfoList: WithCorpType[] = []
  const response = {
    statusCode: 200,
    data: withMainInfoList,
  }
  await basicAxios
    .get(`/with/nomember/corps?${params}`)
    .then(res => {
      response.data = res.data
      if (!res.data.length) {
        response.statusCode = 400
      }
    })
    .catch(err => {
      console.log(err)
      if (err.request.status === 404) {
        response.statusCode = 404
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

  await basicAxios
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
