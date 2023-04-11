import { createAsyncThunk } from '@reduxjs/toolkit'
import apiAxios from 'app/apiAxios'
import { setAccessToken } from 'features/auth/authSlice'
import { WithCorpType } from 'types/types'
import { getCookie } from 'util/cookie'

// 전체 목록 조회
export const getAuthWithMainInfoAPI = createAsyncThunk(
  'auth/with/getMainInfo',
  async () => {
    const withMainInfoList: WithCorpType[] = []

    const response = {
      isNotFound404: false,
      data: withMainInfoList,
    }

    await apiAxios
      .get('/with/corps')
      .then(res => {
        response.data = res.data
      })
      .catch(err => {
        console.log(err)
        if (err.request.status === 404) {
          response.isNotFound404 = true
        }
        if (err.request.status === 403) {
          const refreshToken = getCookie('refresh-token')
          apiAxios
            .get(process.env.REACT_APP_API + '/api/member/refresh', {
              data: { refreshToken: refreshToken },
            })
            .then(res => {
              const accessToken = res.data.accessToken
              dispatch(setAccessToken(accessToken))
            })
        }
      })

    return response
  },
)

// 검색창 조회
export const getAuthWithSearchListAPI = createAsyncThunk(
  'auth/with/getSearchList',
  async (value: string) => {
    const withMainInfoList: WithCorpType[] = []

    const response = {
      statusCode: 200,
      data: withMainInfoList,
    }

    await apiAxios
      .get('/with/corps', { params: { name: value } })
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

// 카테고리 조회
export const getAuthWithCategoryListAPI = createAsyncThunk(
  'auth/with/getCategoryList',
  async (params: string) => {
    const withMainInfoList: WithCorpType[] = []

    const response = {
      statusCode: 200,
      data: withMainInfoList,
    }

    await apiAxios
      .get(`/with/corps?${params}`)
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
export const getAuthWithSpecificInfoAPI = createAsyncThunk(
  'auth/self/getCategoryList',
  async (id?: string) => {
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

    await apiAxios
      .get(`/with/corps/${id}`)
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
export const withScrapToolAPI = createAsyncThunk(
  'auth/with/scrap',
  async (corpId?: number) => {
    const response = {
      statusCode: 200,
    }

    await apiAxios
      .post(`/with/corps/${corpId}/bookmarks`)
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
export const withUnscrapToolAPI = createAsyncThunk(
  'auth/with/unscrap',
  async (corpId?: number) => {
    const response = {
      statusCode: 200,
    }

    await apiAxios
      .delete(`/with/corps/${corpId}/bookmarks`)
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
function dispatch(arg0: { payload: any; type: 'auth/setAccessToken' }) {
  throw new Error('Function not implemented.')
}
