import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import apiAxios from 'app/apiAxios'
import { RootState } from 'app/store'
import { IdStatus } from 'types/types'
import { DemandType } from 'types/userTypes'

type DataState = {
  requestList: DemandType[]
  status: 'idle' | 'loading' | 'success' | 'failed'
}

const initialState: DataState = {
  requestList: [],
  status: 'idle',
}

export const getRequestList = createAsyncThunk(
  'adminData/getRequestList',
  async (_, { rejectWithValue }) => {
    try {
      const response = await apiAxios.get('/request/demands')
      return response.data
    } catch (error: any) {
      return rejectWithValue(error.message)
    }
  },
)

export const changeRequestStatus = createAsyncThunk(
  'adminData/changeRequestStatus',
  async ({ id, status }: IdStatus, { rejectWithValue }) => {
    try {
      const response = await apiAxios.put(`/request/demands/${id}`, { status })
      return response.data
    } catch (error: any) {
      return rejectWithValue(error.message)
    }
  },
)
export const deleteRequest = createAsyncThunk(
  'adminData/changeRequestStatus',
  async ({ id }: IdStatus, { rejectWithValue }) => {
    try {
      const response = await apiAxios.delete(`/request/demands/${id}`)
      return response.data
    } catch (error: any) {
      return rejectWithValue(error.message)
    }
  },
)

export const adminDataSlice = createSlice({
  name: 'adminData',
  initialState,
  reducers: {
    resetRequestList: state => {
      state.requestList = []
    },
  },
  extraReducers: builder => {
    builder
      .addCase(getRequestList.pending, state => {
        state.status = 'loading'
      })
      .addCase(getRequestList.fulfilled, (state, { payload }) => {
        state.status = 'success'
        state.requestList = payload
      })
      .addCase(getRequestList.rejected, state => {
        state.status = 'failed'
      })
  },
})

export const { resetRequestList } = adminDataSlice.actions
export default adminDataSlice.reducer

export const selectRequestList = (state: RootState) =>
  state.adminData.requestList
