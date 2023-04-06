import { SelfSpecificInfo } from '../types/types'
import axios, { AxiosInstance } from 'axios'
import { baseURL } from 'app/apiAxios'
import { SelfMainInfo } from 'types/types'

const basicAxios: AxiosInstance = axios.create({
  baseURL: baseURL,
})

// 전체 목록 조회
export const getSelfMainInfoAPI = async () => {
  const selfMainInfoList: SelfMainInfo[] = []
  const response = {
    isNotFound404: false,
    data: selfMainInfoList,
  }

  await basicAxios
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

// 검색창 조회
export const getSelfSearchListAPI = async (value: string) => {
  const selfMainInfoList: SelfMainInfo[] = []

  const response = {
    statusCode: 200,
    data: selfMainInfoList,
  }

  await basicAxios
    .get('/self/nomember/tools', { params: { name: value } })
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

// 카테고리 및 필터 리스트 조회
export const getSelfCategoryListAPI = async (params: string) => {
  const selfMainInfoList: SelfMainInfo[] = []
  const response = {
    statusCode: 200,
    data: selfMainInfoList,
  }

  await basicAxios
    .get(`/self/nomember/tools?${params}`)
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

export const getSelfSpecificInfoAPI = async (id?: string) => {
  const selfSpecificInfo: SelfSpecificInfo = {
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
    isBookmarked: false,
    isSubscribed: false,
  }

  const response = {
    isNotFound404: false,
    data: selfSpecificInfo,
  }

  await basicAxios
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
