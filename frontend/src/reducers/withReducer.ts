import { RootState } from 'app/store'
import { createSlice } from '@reduxjs/toolkit'
import { WithCorpType } from 'types/dataTypes'

export interface WithState {
  withMainInfoList: WithCorpType[]
  withSpecificInfo: WithCorpType
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
  },
})

export const { setWithMainInfoList, setWithSpecificInfo } = withReducer.actions

export const withMainInfoList = (state: RootState) =>
  state.with.withMainInfoList
export const withSpecificInfo = (state: RootState) =>
  state.with.withSpecificInfo

export default withReducer.reducer
