// 마이페이지 reducer
import { RootState } from 'app/store'
import { createSlice } from '@reduxjs/toolkit'
import { GuideType, SelfMainInfo, WithCorpType } from 'types/types'
import { UserInfoType } from 'types/userTypes'

export interface SettingState {
  selectContent: string
  selfScrapList: SelfMainInfo[]
  withScrapList: WithCorpType[]
  guideListForScrap: GuideType[]
  guideScrapList: GuideType[]
  selfScrapExportList: SelfMainInfo[]
  withScrapExportList: WithCorpType[]
  guideScrapExportList: GuideType[]
  selfScrapCount: number
  withScrapCount: number
  guideScrapCount: number
  userInfo: UserInfoType
  isWithdrawModal: boolean
}

const initialState: SettingState = {
  selectContent: '직무별 툴',
  selfScrapList: [],
  guideScrapList: [],
  guideListForScrap: [],
  withScrapList: [],
  selfScrapExportList: [],
  withScrapExportList: [],
  guideScrapExportList: [],
  selfScrapCount: 0,
  withScrapCount: 0,
  guideScrapCount: 0,
  userInfo: {
    email: '',
    id: 0,
    image: '',
    name: '',
    type: '',
    subscribeActive: false,
    emailVerified: false,
    subscribeEmail: '',
  },
  isWithdrawModal: false,
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
    setGuideListForScrap: (state, { payload: input }) => {
      return { ...state, guideListForScrap: input }
    },
    setGuideScrapList: (state, { payload: input }) => {
      return { ...state, guideScrapList: input }
    },
    setGuideScrapExportList: (state, { payload: input }) => {
      return { ...state, guideScrapExportList: input }
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
    changeGuideScrapCount: state => {
      state.guideScrapCount += 1
    },
    resetGuideScrapCount: state => {
      state.guideScrapCount = 0
    },
    setUserInfo: (state, { payload: input }) => {
      return { ...state, userInfo: input }
    },
    changeWithDrawModalStatus: state => {
      state.isWithdrawModal = !state.isWithdrawModal
    },
  },
})

export const {
  setSelectContent,
  setSelfScrapList,
  setSelfScrapExportList,
  setWithScrapList,
  setWithScrapExportList,
  setGuideListForScrap,
  setGuideScrapList,
  setGuideScrapExportList,
  changeSelfScrapCount,
  resetSelfScrapCount,
  changeWithScrapCount,
  resetWithScrapCount,
  changeGuideScrapCount,
  resetGuideScrapCount,
  setUserInfo,
  changeWithDrawModalStatus,
} = settingReducer.actions

export const selectContent = (state: RootState) => state.setting.selectContent
export const selfScrapList = (state: RootState) => state.setting.selfScrapList
export const selfScrapExportList = (state: RootState) =>
  state.setting.selfScrapExportList
export const withScrapList = (state: RootState) => state.setting.withScrapList
export const withScrapExportList = (state: RootState) =>
  state.setting.withScrapExportList
export const guideListForScrap = (state: RootState) =>
  state.setting.guideListForScrap
export const guideScrapList = (state: RootState) => state.setting.guideScrapList
export const guideScrapExportList = (state: RootState) =>
  state.setting.guideScrapExportList
export const selfScrapCount = (state: RootState) => state.setting.selfScrapCount
export const withScrapCount = (state: RootState) => state.setting.withScrapCount
export const guideScrapCount = (state: RootState) =>
  state.setting.guideScrapCount
export const userInfo = (state: RootState) => state.setting.userInfo
export const withdrawModalState = (state: RootState) =>
  state.setting.isWithdrawModal

export default settingReducer.reducer
