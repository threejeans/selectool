import { createAsyncThunk } from '@reduxjs/toolkit'
import apiAxios from 'app/apiAxios'

export const withScrapToolAPI = createAsyncThunk(
  'auth/with/scrap',
  async (corpId?: number) => {
    await apiAxios
      .post(`/with/corps/${corpId}/bookmarks`)
      .then(res => {
        return res.status
      })
      .catch(err => {
        console.log(err)
      })
  },
)

export const withUnscrapToolAPI = createAsyncThunk(
  'auth/with/unscrap',
  async (corpId?: number) => {
    await apiAxios
      .delete(`/with/corps/${corpId}/bookmarks`)
      .then(res => {
        return res.status
      })
      .catch(err => {
        console.log(err)
      })
  },
)
