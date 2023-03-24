import { RootState } from 'app/store'
import { createSlice } from '@reduxjs/toolkit'
import { SelfMainInfo, ToolType } from 'types/types'

export interface SelfState {
  isFilterModal: boolean
  selfMainInfoList: SelfMainInfo[]
  selfSpecificInfo: ToolType
  selfCategoryFilterList: filterObjectType[]
}

export type filterObjectType = {
  type: string
  isSelected: boolean
  content: string
}

const filterContents = ['ALL', '디자인', '개발', '마케팅', '기획', 'Other']

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
    trial: false,
    plans: [],
    aos: '',
    ios: '',
  },
  selfCategoryFilterList: [...new Array(filterContents.length)].map(
    (data, idx) =>
      (data = {
        type: 'basic',
        isSelected: false,
        content: filterContents[idx],
      }),
  ),
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
    setSelfCategoryFilterList(state, { payload: input }) {
      return { ...state, selfCategoryFilterList: input }
    },
  },
})

export const {
  changeFilterModalStatus,
  setSelfMainInfoList,
  setSelfSpecificInfo,
  setSelfCategoryFilterList,
} = selfReducer.actions

export const filterModalState = (state: RootState) => state.self.isFilterModal
export const selfMainInfoList = (state: RootState) =>
  state.self.selfMainInfoList
export const selfSpecificInfo = (state: RootState) =>
  state.self.selfSpecificInfo
export const selfCategoryFilterList = (state: RootState) =>
  state.self.selfCategoryFilterList

export default selfReducer.reducer
