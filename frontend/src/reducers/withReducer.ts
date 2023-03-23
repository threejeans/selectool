import { RootState } from 'app/store'
import { createSlice } from '@reduxjs/toolkit'
import { WithCorpType } from 'types/types'

export interface WithState {
  withMainInfoList: WithCorpType[]
  withSpecificInfo: WithCorpType
  isToolSpecificModal: boolean
}

const initialState: WithState = {
  withMainInfoList: [],
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
}

const withReducer = createSlice({
  name: 'withReducer',
  initialState: initialState,
  reducers: {
    setWithMainInfoList(state, { payload: input }) {
      return { ...state, withMainInfoList: input }
    },
    setWithSpecificInfo(state, { payload: input }) {
      return { ...state, withSpecificInfo: input }
    },
    changeToolSpecificModalStatus: state => {
      state.isToolSpecificModal = !state.isToolSpecificModal
    },
  },
})

export const {
  setWithMainInfoList,
  setWithSpecificInfo,
  changeToolSpecificModalStatus,
} = withReducer.actions

export const withMainInfoList = (state: RootState) =>
  state.with.withMainInfoList
export const withSpecificInfo = (state: RootState) =>
  state.with.withSpecificInfo
export const toolSpecificModalState = (state: RootState) =>
  state.with.isToolSpecificModal

export default withReducer.reducer
