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
