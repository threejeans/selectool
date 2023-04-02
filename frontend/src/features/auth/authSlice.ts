import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import apiAxios from 'app/apiAxios'
import { RootState } from 'app/store'

export interface AuthState {
  isLoginModal: boolean
  accessToken: string | undefined
  status: 'idle' | 'loading' | 'success' | 'rejected'
}

const initialState: AuthState = {
  isLoginModal: false,
  accessToken:
    'eyJyZWdEYXRlIjoxNjgwNDAyOTQ0NjI4LCJ0eXAiOiJBQ0NFU1NfVE9LRU4iLCJhbGciOiJIUzI1NiJ9.eyJpZCI6NywiZXhwIjoxNjgwNDQ2MTQ0fQ.hAV61vXYcQf2zOIPSDJ2ac9H9Tqma2YgWLQ40jxlots',
  // undefined,
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
    setAccessToken: (state, { payload }) => {
      console.log('Access Token saved on memory from slice', payload)
      state.accessToken = payload
    },
    resetAccessToken: state => {
      state.accessToken = undefined
    },
  },
})

export const {
  loginModalOpen,
  loginModalClose,
  setAccessToken,
  resetAccessToken,
} = authSlice.actions

export const selectLoginModal = (state: RootState) => state.auth.isLoginModal
export const selectAccessToken = (state: RootState) => state.auth.accessToken

export default authSlice.reducer
