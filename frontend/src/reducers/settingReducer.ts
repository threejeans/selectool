// 마이페이지 reducer
import { RootState } from 'app/store'
import { createSlice } from '@reduxjs/toolkit'
import { SelfMainInfo, WithCorpType } from 'types/types'

export interface SettingState {
  selectContent: string
  selfScrapList: SelfMainInfo[]
  withScrapList: WithCorpType[]
  selfScrapExportList: SelfMainInfo[]
  withScrapExportList: WithCorpType[]
  selfScrapCount: number
  withScrapCount: number
}

const initialState: SettingState = {
  selectContent: '혼자써요',
  selfScrapList: [],
  selfScrapExportList: [],
  withScrapList: [],
  withScrapExportList: [],
  selfScrapCount: 0,
  withScrapCount: 0,
}

const settingReducer = createSlice({
  name: 'settingReducer',
  initialState: initialState,
  reducers: {
    setSelectContent: (state, { payload: input }) => {
      return { ...state, selectContent: input }
    },
    setSelfScrapList: (state, { payload: input }) => {
      return { ...state, selfScrapList: input }
    },
    setSelfScrapExportList: (state, { payload: input }) => {
      return { ...state, selfScrapExportList: input }
    },
    setWithScrapList: (state, { payload: input }) => {
      return { ...state, withScrapList: input }
    },
    setWithScrapExportList: (state, { payload: input }) => {
      return { ...state, withScrapExportList: input }
    },
    changeSelfScrapCount: state => {
      state.selfScrapCount += 1
    },
    resetSelfScrapCount: state => {
      state.selfScrapCount = 0
    },
    changeWithScrapCount: state => {
      state.withScrapCount += 1
    },
    resetWithScrapCount: state => {
      state.withScrapCount = 0
    },
  },
})

export const {
  setSelectContent,
  setSelfScrapList,
  setSelfScrapExportList,
  setWithScrapList,
  setWithScrapExportList,
  changeSelfScrapCount,
  resetSelfScrapCount,
  changeWithScrapCount,
  resetWithScrapCount,
} = settingReducer.actions

export const selectContent = (state: RootState) => state.setting.selectContent
export const selfScrapList = (state: RootState) => state.setting.selfScrapList
export const selfScrapExportList = (state: RootState) =>
  state.setting.selfScrapExportList
export const withScrapList = (state: RootState) => state.setting.withScrapList
export const withScrapExportList = (state: RootState) =>
  state.setting.withScrapExportList
export const selfScrapCount = (state: RootState) => state.setting.selfScrapCount
export const withScrapCount = (state: RootState) => state.setting.withScrapCount

export default settingReducer.reducer