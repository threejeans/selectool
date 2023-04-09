import { createAsyncThunk } from '@reduxjs/toolkit'
import apiAxios from 'app/apiAxios'
import { SelfMainInfo, SelfSpecificInfo } from 'types/types'

// 전체 목록 조회
export const getAuthSelfMainInfoAPI = createAsyncThunk(
  'auth/self/getMainInfo',
  async () => {
    const selfMainInfoList: SelfMainInfo[] = []

    const response = {
      isNotFound404: false,
      data: selfMainInfoList,
    }

    await apiAxios
      .get('/self/tools')
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
  },
)

// 검색창 조회
export const getAuthSelfSearchListAPI = createAsyncThunk(
  'auth/self/getSearchList',
  async (value: string) => {
    const selfMainInfoList: SelfMainInfo[] = []

    const response = {
      statusCode: 200,
      data: selfMainInfoList,
    }

    await apiAxios
      .get('/self/tools', { params: { name: value } })
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
  },
)

// 카테고리 및 필터 리스트 조회
export const getAuthSelfCategoryListAPI = createAsyncThunk(
  'auth/self/getCategoryList',
  async (params: string) => {
    const selfMainInfoList: SelfMainInfo[] = []

    const response = {
      statusCode: 200,
      data: selfMainInfoList,
    }

    await apiAxios
      .get(`/self/tools?${params}`)
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
  },
)

// 상세 정보 조회
export const getAuthSelfSpecificInfoAPI = createAsyncThunk(
  'auth/self/getCategoryList',
  async (id?: string) => {
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

    await apiAxios
      .get(`/self/tools/${id}`)
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
  },
)

// 스크랩
export const selfScrapToolAPI = createAsyncThunk(
  'auth/self/scrap',
  async (toolId?: number) => {
    const response = {
      statusCode: 200,
    }

    await apiAxios
      .post(`/self/tools/${toolId}/bookmarks`)
      .then(res => {
        response.statusCode = res.status
      })
      .catch(err => {
        console.log(err)
        response.statusCode = err.request.status
      })
    return response
  },
)

// 스크랩 취소
export const selfUnscrapToolAPI = createAsyncThunk(
  'auth/self/unscrap',
  async (toolId?: number) => {
    const response = {
      statusCode: 200,
    }

    await apiAxios
      .delete(`/self/tools/${toolId}/bookmarks`)
      .then(res => {
        response.statusCode = res.status
      })
      .catch(err => {
        console.log(err)
        response.statusCode = err.request.status
      })
    return response
  },
)

// 툴 구독
export const selfSubscribeToolAPI = createAsyncThunk(
  'auth/self/subscribe',
  async (toolId?: number) => {
    const response = {
      statusCode: 200,
    }

    await apiAxios
      .post(`/self/tools/${toolId}/subscribes`)
      .then(res => {
        response.statusCode = res.status
      })
      .catch(err => {
        console.log(err)
        response.statusCode = err.request.status
      })
    return response
  },
)

// 툴 구독 해제
export const selfUnsubscribeToolAPI = createAsyncThunk(
  'auth/self/unsubscribe',
  async (toolId?: number) => {
    const response = {
      statusCode: 200,
    }

    await apiAxios
      .delete(`/self/tools/${toolId}/subscribes`)
      .then(res => {
        response.statusCode = res.status
      })
      .catch(err => {
        console.log(err)
        response.statusCode = err.request.status
      })
    return response
  },
)
