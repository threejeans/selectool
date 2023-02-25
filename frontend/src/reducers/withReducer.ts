import { createSlice } from '@reduxjs/toolkit'
import { WithMainInfo } from 'types/DataTypes'

export interface WithState {
  withMainInfoList: WithMainInfo[]
}

const initialState: WithState = {
  withMainInfoList: [],
}

const withReducer = createSlice({
  name: 'withReducer',
  initialState: initialState,
  reducers: {
    setWithMainInfoList(state, { payload: input }) {
      return { ...state, withMainInfoList: input }
    },
  },
})

export const { setWithMainInfoList } = withReducer.actions

export const withMainInfoList = (state: any) => state.with.withMainInfoList

export default withReducer.reducer
