import { ToolType } from './../types/dataTypes'
import axios, { AxiosInstance } from 'axios'
import { createAsyncThunk } from '@reduxjs/toolkit'
import apiAxios, { baseURL } from 'app/apiAxios'
import { SelfMainInfo } from 'types/dataTypes'

const authAxios: AxiosInstance = axios.create({
  baseURL: baseURL,
  headers: {
    Authorization:
      'Bearer eyJyZWdEYXRlIjoxNjc3ODEzNTU0OTMzLCJ0eXAiOiJBQ0NFU1NfVE9LRU4iLCJhbGciOiJIUzI1NiJ9.eyJpZCI6NywiZXhwIjoxNjc3ODU2NzU0fQ.N3oQrLs3Xv6jehXeQcn2XDRvaIMzoucmPG11DTxWqKg',
  },
})

export const getSelfMainInfoAPI = async () => {
  let selfMainInfoList: SelfMainInfo[] = []

  await authAxios
    .get('/self/tools')
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
    plans: [],
    aos: '',
    ios: '',
  }

  await authAxios
    .get(`/self/tools/${id}`)
    .then(res => {
      selfSpecificInfo = res.data
    })
    .catch(err => {
      console.log(err)
    })

  return selfSpecificInfo
}
