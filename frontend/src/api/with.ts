import { baseURL } from 'app/apiAxios'
import axios, { AxiosInstance } from 'axios'
import { WithCorpType } from 'types/dataTypes'

const authAxios: AxiosInstance = axios.create({
  baseURL: baseURL,
})

export const getWithMainInfoAPI = async () => {
  let withMainInfoList: WithCorpType[] = []

  await authAxios
    .get('/with/nomember/corps')
    .then(res => {
      withMainInfoList = res.data
    })
    .catch(err => {
      console.log(err)
    })

  return withMainInfoList
}

export const getWithSpecificInfoAPI = async (corpId?: string) => {
  let withSpecificInfo: WithCorpType = {
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

  await authAxios
    .get(`/with/nomember/corps/${corpId}`)
    .then(res => {
      withSpecificInfo = res.data
    })
    .catch(err => {
      console.log(err)
    })

  return withSpecificInfo
}
