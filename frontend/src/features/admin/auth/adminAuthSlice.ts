import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import apiAxios from 'app/apiAxios'
import { RootState } from 'app/store'

export interface AuthState {
  accessToken: string | undefined
  tmpEmail: string
  status: 'idle' | 'loading' | 'success' | 'failed'
}

const initialState: AuthState = {
  accessToken: '',
  tmpEmail: '',
  status: 'idle',
}

export const loginAdmin = createAsyncThunk(
  'admin/auth/loginAdmin',
  async ({ email }: any, { rejectWithValue }) => {
    try {
      const response = await apiAxios.post('/admin/login', { email: email })
      console.log(response) //
      return response.data
    } catch (error: any) {
      console.log(error) //
      return rejectWithValue(error.message)
    }
  },
)
export const authAdmin = createAsyncThunk(
  'admin/auth/authAdmin',
  async ({ email, auth }: any, { rejectWithValue }) => {
    try {
      const response = await apiAxios.post('/admin/auth', { email, auth })
      console.log(response)
      const accessToken = response.headers['access-token']
      console.log('accessToken', accessToken)
      return { data: response.data, accessToken: accessToken }
    } catch (error: any) {
      console.log(error) //
      return rejectWithValue(error.message)
    }
  },
)
export const adminAuthSlice = createSlice({
  name: 'adminAuth',
  initialState,
  reducers: {
    setTmpEmail: (state, { payload }) => {
      state.tmpEmail = payload
    },
  },
  extraReducers: builder => {
    builder
      .addCase(loginAdmin.pending, state => {
        state.status = 'loading'
      })
      .addCase(loginAdmin.fulfilled, state => {
        state.status = 'success'
      })
      .addCase(loginAdmin.rejected, state => {
        state.status = 'failed'
      })
      .addCase(authAdmin.pending, state => {
        state.status = 'loading'
      })
      .addCase(authAdmin.fulfilled, (state, { payload }) => {
        state.status = 'success'
        console.log(payload)
        state.accessToken = payload.accessToken
      })
      .addCase(authAdmin.rejected, state => {
        state.status = 'failed'
      })
  },
})

export const { setTmpEmail } = adminAuthSlice.actions

export const selectAuthStatus = (state: RootState) => state.adminAuth.status
export const selectAccessToken = (state: RootState) =>
  state.adminAuth.accessToken
export const selectTmpEmail = (state: RootState) => state.adminAuth.tmpEmail

export default adminAuthSlice.reducer
