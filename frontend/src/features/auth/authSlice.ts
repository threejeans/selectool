import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import apiAxios from 'app/apiAxios'
import { RootState } from 'app/store'

export interface AuthState {
  isLoginModal: boolean
  accessToken: string
  status: 'idle' | 'loading' | 'success' | 'rejected'
}

const initialState: AuthState = {
  isLoginModal: false,
  accessToken: '',
  status: 'idle',
}

export const simpleLogin = createAsyncThunk(
  'auth/simpleLogin',
  async ({ type, code }: any, ThunkAction) => {
    console.log(type, code)
    try {
      const response = await apiAxios.get(`/member/login/${type}?code=${code}`)
      return response
    } catch (err) {
      console.error(err)
    }
  },
)

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginModalOpen: state => {
      state.isLoginModal = true
    },
    loginModalClose: state => {
      state.isLoginModal = false
    },
  },
  extraReducers: builder => {
    builder
      .addCase(simpleLogin.pending, state => {
        state.status = 'loading'
      })
      .addCase(simpleLogin.fulfilled, (state, action) => {
        console.log(action)
        // state.accessToken = action.payload.headers[""]
        console.log('saved token from authSlice.ts')
      })
      .addCase(simpleLogin.rejected, (state, action) => {
        console.log(action)
        state.status = 'rejected'
      })
  },
})

export const { loginModalOpen, loginModalClose } = authSlice.actions

export const selectLoginModal = (state: RootState) => state.auth.isLoginModal

export default authSlice.reducer
