// 마이페이지
import { createAsyncThunk } from '@reduxjs/toolkit'
import apiAxios, { baseURL } from 'app/apiAxios'
import axios, { AxiosInstance } from 'axios'
import { UserInfoType } from 'types/userTypes'

const basicAxios: AxiosInstance = axios.create({
  baseURL: baseURL,
})

// 유저 정보 조회
export const getUserInfoAPI = createAsyncThunk(
  'auth/mypage/getUserInfo',
  async () => {
    const userInfo: UserInfoType = {
      email: '',
      id: 0,
      image: '',
      name: '',
      type: '',
      subscribeEmail: '',
      subscribeActive: false,
    }

    const response = {
      statusCode: 200,
      data: userInfo,
    }

    await apiAxios
      .get('/member/info')
      .then(res => {
        response.data = res.data
      })
      .catch(err => {
        console.log(err)
        response.statusCode = err.request.status
      })
    return response
  },
)

type DemandType = {
  content: string
  type: string
}

// 요청 사항 추가
export const registerAuthRequestAPI = createAsyncThunk(
  'auth/request/register',
  async (value: DemandType) => {
    const response = {
      statusCode: 200,
    }

    await apiAxios
      .post('/request/demands', { params: value })
      .then(res => {
        console.log(res)
        response.statusCode = res.status
      })
      .catch(err => {
        console.log(err)
        response.statusCode = err.request.status
      })

    return response.statusCode
  },
)

export const registerRequestAPI = async (value: DemandType) => {
  const response = {
    statusCode: 200,
  }

  await basicAxios
    .post('/request/demands', { params: value })
    .then(res => {
      console.log(res.data)
      response.statusCode = res.status
    })
    .catch(err => {
      console.log(err)
      response.statusCode = err.request.status
    })

  return response.statusCode
}

type EditUserType = {
  image?: string
  name?: string
  subscribeActive?: boolean
  subscribeEmail?: string
}

// 유저 정보 변경
export const editUserInfoAPI = createAsyncThunk(
  'auth/userInfo/edit',
  async (value: EditUserType) => {
    const response = {
      statusCode: 200,
    }

    await apiAxios
      .put('/member/info', { params: value })
      .then(res => {
        console.log(res)
        response.statusCode = res.status
      })
      .catch(err => {
        console.log(err)
        response.statusCode = err.request.status
      })

    return response.statusCode
  },
)
