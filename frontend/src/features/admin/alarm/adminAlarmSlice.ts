import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import apiAxios from 'app/apiAxios'
import { RootState } from 'app/store'
import { SubscribeType } from 'types/userTypes'

type AlarmState = {
  subscribeList: SubscribeType[]
  status: 'idle' | 'loading' | 'success' | 'failed'
}

const initialState: AlarmState = {
  subscribeList: [],
  status: 'idle',
}

export const getSubscribeList = createAsyncThunk(
  'adminAlarm/getSubscribeList',
  async (_, { rejectWithValue }) => {
    try {
      return (await apiAxios.get('/self/subscribes/users')).data
    } catch (error: any) {
      return rejectWithValue(error.message)
    }
  },
)

export const adminAlarmSlice = createSlice({
  name: 'adminAlarm',
  initialState,
  reducers: {
    reset: () => {
      console.log('')
    },
  },
  extraReducers: builder => {
    builder
      .addCase(getSubscribeList.pending, state => {
        state.status = 'loading'
      })
      .addCase(getSubscribeList.fulfilled, (state, { payload }) => {
        state.subscribeList = payload
        state.status = 'success'
      })
      .addCase(getSubscribeList.rejected, state => {
        state.status = 'failed'
      })
  },
})

export const { reset } = adminAlarmSlice.actions
export default adminAlarmSlice.reducer

export const selectSubscribeList = (state: RootState) =>
  state.adminAlarm.subscribeList
