import { RootState } from 'app/store'
import { createSlice } from '@reduxjs/toolkit'
import { SelfMainInfo, ToolType } from 'types/dataTypes'

export interface SelfState {
  isFilterModal: boolean
  selfMainInfoList: SelfMainInfo[]
  selfSpecificInfo: ToolType
}

const initialState: SelfState = {
  isFilterModal: false,
  selfMainInfoList: [],
  selfSpecificInfo: {
    // main
    nameKr: '',
    nameEn: '',
    info: '',
    msg: '',
    topic: '',
    categories: [],
    country: '',
    image: '',
    // specific
    url: '',
    toolFunctions: [],
    clients: [],
    plans: [],
    aos: '',
    ios: '',
  },
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
    setSelfSpecificInfo(state, { payload: input }) {
      return { ...state, selfSpecificInfo: input }
    },
  },
})

export const {
  changeFilterModalStatus,
  setSelfMainInfoList,
  setSelfSpecificInfo,
} = selfReducer.actions

export const filterModalState = (state: RootState) => state.self.isFilterModal
export const selfMainInfoList = (state: RootState) =>
  state.self.selfMainInfoList
export const selfSpecificInfo = (state: RootState) =>
  state.self.selfSpecificInfo

export default selfReducer.reducer
