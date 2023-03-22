import { RootState } from 'app/store'
import { createSlice } from '@reduxjs/toolkit'

export interface CommonState {
  isNotFound404: boolean
}

const initialState: CommonState = {
  isNotFound404: false,
}

const commonReducer = createSlice({
  name: 'commonReducer',
  initialState: initialState,
  reducers: {
    setNotFound404: state => {
      state.isNotFound404 = !state.isNotFound404
    },
  },
})

export const { setNotFound404 } = commonReducer.actions

export const notFound404State = (state: RootState) => state.common.isNotFound404

export default commonReducer.reducer
