import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import apiAxios from 'app/apiAxios'
import { RootState } from 'app/store'

export interface AuthState {
  isLoginModal: boolean
}

const initialState: AuthState = {
  isLoginModal: false,
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
})

export const { loginModalOpen, loginModalClose } = authSlice.actions

export const selectLoginModal = (state: RootState) => state.auth.isLoginModal

export default authSlice.reducer
