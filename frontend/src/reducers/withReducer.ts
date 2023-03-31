import { RootState } from 'app/store'
import { createSlice } from '@reduxjs/toolkit'
import { WithCorpType } from 'types/types'
import { filterObjectType } from './selfReducer'

export interface WithState {
  withMainInfoList: WithCorpType[]
  withMainInfoExportList: WithCorpType[]
  withSpecificInfo: WithCorpType
  isToolSpecificModal: boolean
  withCategoryFilterList: filterObjectType[]
  withContentCount: number
}

const filterContents = [
  '금융',
  '커뮤니티',
  '모빌리티',
  '여행/레저',
  '커머스',
  'Other',
]

const initialState: WithState = {
  withMainInfoList: [],
  withMainInfoExportList: [],
  withSpecificInfo: {
    image: '',
    info: '',
    isBookmarked: false,
    nameEn: '',
    nameKr: '',
    teamNameEn: '',
    teamNameKr: '',
    url: '',
    content: '',
    branches: [],
    categories: [],
    cultures: [],
    tools: [],
  },
  isToolSpecificModal: false,
  withCategoryFilterList: [...new Array(filterContents.length)].map(
    (data, idx) =>
      (data = {
        type: 'basic',
        isSelected: false,
        content: filterContents[idx],
      }),
  ),
  withContentCount: 0,
}

const withReducer = createSlice({
  name: 'withReducer',
  initialState: initialState,
  reducers: {
    setWithMainInfoList(state, { payload: input }) {
      return { ...state, withMainInfoList: input }
    },
    setWithMainInfoExportList(state, { payload: input }) {
      return { ...state, withMainInfoExportList: input }
    },
    setWithSpecificInfo(state, { payload: input }) {
      return { ...state, withSpecificInfo: input }
    },
    changeToolSpecificModalStatus: state => {
      state.isToolSpecificModal = !state.isToolSpecificModal
    },
    setWithCategoryFilterList(state, { payload: input }) {
      return { ...state, withCategoryFilterList: input }
    },
    changeWithContentCount: state => {
      state.withContentCount += 1
    },
    resetWithContentCount: state => {
      state.withContentCount = 0
    },
  },
})

export const {
  setWithMainInfoList,
  setWithMainInfoExportList,
  setWithSpecificInfo,
  changeToolSpecificModalStatus,
  setWithCategoryFilterList,
  changeWithContentCount,
  resetWithContentCount,
} = withReducer.actions

export const withMainInfoList = (state: RootState) =>
  state.with.withMainInfoList
export const withMainInfoExportList = (state: RootState) =>
  state.with.withMainInfoExportList
export const withSpecificInfo = (state: RootState) =>
  state.with.withSpecificInfo
export const toolSpecificModalState = (state: RootState) =>
  state.with.isToolSpecificModal
export const withCategoryFilterList = (state: RootState) =>
  state.with.withCategoryFilterList
export const withContentCount = (state: RootState) =>
  state.with.withContentCount

export default withReducer.reducer
