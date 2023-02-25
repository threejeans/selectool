import { RootState } from 'app/store'
import { createSlice } from '@reduxjs/toolkit'
import { SelfMainInfo } from 'types/DataTypes'

export interface SelfState {
  isFilterModal: boolean
  selfMainInfoList: SelfMainInfo[]
}

const initialState: SelfState = {
  isFilterModal: false,
  selfMainInfoList: [],
}

const selfReducer = createSlice({
  name: 'selfReducer',
  initialState: initialState,
  reducers: {
    changeFilterModalStatus: state => {
      state.isFilterModal = !state.isFilterModal
    },
    setSelfMainInfoList(state, { payload: input }) {
      return { ...state, selfMainInfoList: input }
    },
  },
})

export const { changeFilterModalStatus, setSelfMainInfoList } =
  selfReducer.actions

export const filterModalState = (state: RootState) => state.self.isFilterModal
export const selfMainInfoList = (state: any) => state.self.selfMainInfoList

export default selfReducer.reducer
