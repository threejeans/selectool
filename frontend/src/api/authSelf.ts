import { createAsyncThunk } from '@reduxjs/toolkit'
import apiAxios from 'app/apiAxios'
import { SelfMainInfo } from 'types/types'

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

export const selfScrapToolAPI = createAsyncThunk(
  'auth/self/scrap',
  async (toolId: number) => {
    await apiAxios
      .post(`/self/tools/${toolId}/bookmarks`)
      .then(res => {
        console.log(res)
      })
      .catch(err => {
        console.log(err)
      })
  },
)

export const selfUnscrapToolAPI = createAsyncThunk(
  'auth/self/unscrap',
  async (toolId: number) => {
    await apiAxios
      .delete(`/self/tools/${toolId}/bookmarks`)
      .then(res => {
        console.log(res)
      })
      .catch(err => {
        console.log(err)
      })
  },
)
