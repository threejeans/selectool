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
      emailVerified: false,
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
      .post('/request/demands', value)
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
    .post('/request/demands', value)
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
      .put('/member/info', value)
      .then(res => {
        response.statusCode = res.status
      })
      .catch(err => {
        console.log(err)
        response.statusCode = err.request.status
      })

    return response.statusCode
  },
)

// 회원 탈퇴
export const userWithdrawAPI = createAsyncThunk(
  'auth/user/withdraw',
  async () => {
    const response = {
      statusCode: 200,
    }

    await apiAxios
      .put('/member/withdraw')
      .then(res => {
        response.statusCode = res.status
      })
      .catch(err => {
        console.log(err)
        response.statusCode = err.request.status
      })

    return response.statusCode
  },
)

// 유저 이메일 인증 메일 발송
export const userEmailAuthorizeAPI = createAsyncThunk(
  'auth/userEmail/Authorize',
  async (subscribeEmail: string) => {
    const response = {
      statusCode: 200,
    }

    await apiAxios
      .post('/member/info/email', { email: subscribeEmail })
      .then(res => {
        response.statusCode = res.status
      })
      .catch(err => {
        console.log(err)
        response.statusCode = err.request.status
      })

    return response.statusCode
  },
)
