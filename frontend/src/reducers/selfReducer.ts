import { RootState } from 'app/store'
import { createSlice } from '@reduxjs/toolkit'
import { SelfMainInfo, SelfSpecificInfo } from 'types/types'

export interface SelfState {
  isFilterModal: boolean
  isFilterModalChecked: boolean
  selfCategoryFilterParams: string
  selfModalFilterParams: string
  selfMainInfoList: SelfMainInfo[]
  selfMainInfoExportList: SelfMainInfo[]
  selfSpecificInfo: SelfSpecificInfo
  selfCategoryFilterList: filterObjectType[]
  selfModalFilterList: {
    [key: string]: filterObjectType[]
    cost: filterObjectType[]
    sort: filterObjectType[]
    country: filterObjectType[]
  }
  selfContentCount: number
}

export type filterObjectType = {
  type: string
  isSelected: boolean
  content: string
}

const filterContents = ['ALL', '디자인', '개발', '마케팅', '기획', 'Other']
const costContents = [
  '전체',
  '무료 플랜',
  // '5천원 이하',
  // '5천원 ~ 1만원',
  // '1만원 ~ 5만원',
  // '5만원 이상',
]
const sortContents = ['가나다순', '북마크 많은 순']
const countryContents = ['전체', '국내', '해외']

const initialState: SelfState = {
  isFilterModal: false,
  isFilterModalChecked: false,
  selfCategoryFilterParams: '',
  selfModalFilterParams: '',
  selfMainInfoList: [],
  selfMainInfoExportList: [],
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
    isBookmarked: false,
  },
  selfCategoryFilterList: [...new Array(filterContents.length)].map(
    (data, idx) =>
      (data = {
        type: 'basic',
        isSelected: false,
        content: filterContents[idx],
      }),
  ),
  selfModalFilterList: {
    cost: [...new Array(costContents.length)].map(
      (data, idx) =>
        (data = {
          type: 'modalBasic',
          isSelected: false,
          content: costContents[idx],
        }),
    ),
    sort: [...new Array(sortContents.length)].map(
      (data, idx) =>
        (data = {
          type: 'modalBasic',
          isSelected: false,
          content: sortContents[idx],
        }),
    ),
    country: [...new Array(countryContents.length)].map(
      (data, idx) =>
        (data = {
          type: 'modalBasic',
          isSelected: false,
          content: countryContents[idx],
        }),
    ),
  },
  selfContentCount: 0,
}

const selfReducer = createSlice({
  name: 'selfReducer',
  initialState: initialState,
  reducers: {
    changeFilterModalStatus: state => {
      state.isFilterModal = !state.isFilterModal
    },
    changeFilterModalCheckedStatus(state, { payload: input }) {
      return { ...state, isFilterModalChecked: input }
    },
    setSelfCategoryFilterParams(state, { payload: input }) {
      return { ...state, selfCategoryFilterParams: input }
    },
    setSelfModalFilterParams(state, { payload: input }) {
      return { ...state, selfModalFilterParams: input }
    },
    resetSelfModalFilter: state => {
      state.selfModalFilterList = {
        cost: [...new Array(costContents.length)].map(
          (data, idx) =>
            (data = {
              type: 'modalBasic',
              isSelected: false,
              content: costContents[idx],
            }),
        ),
        sort: [...new Array(sortContents.length)].map(
          (data, idx) =>
            (data = {
              type: 'modalBasic',
              isSelected: false,
              content: sortContents[idx],
            }),
        ),
        country: [...new Array(countryContents.length)].map(
          (data, idx) =>
            (data = {
              type: 'modalBasic',
              isSelected: false,
              content: countryContents[idx],
            }),
        ),
      }
      state.selfModalFilterParams = ''
    },
    setSelfMainInfoList(state, { payload: input }) {
      return { ...state, selfMainInfoList: input }
    },
    setSelfMainInfoExportList(state, { payload: input }) {
      return { ...state, selfMainInfoExportList: input }
    },
    setSelfSpecificInfo(state, { payload: input }) {
      return { ...state, selfSpecificInfo: input }
    },
    setSelfCategoryFilterList(state, { payload: input }) {
      return { ...state, selfCategoryFilterList: input }
    },
    setSelfModalFilterList(state, { payload: input }) {
      return { ...state, selfModalFilterList: input }
    },
    changeSelfContentCount: state => {
      state.selfContentCount += 1
    },
    resetSelfContentCount: state => {
      state.selfContentCount = 0
    },
  },
})

export const {
  changeFilterModalStatus,
  changeFilterModalCheckedStatus,
  setSelfCategoryFilterParams,
  setSelfModalFilterParams,
  resetSelfModalFilter,
  setSelfMainInfoList,
  setSelfMainInfoExportList,
  setSelfSpecificInfo,
  setSelfCategoryFilterList,
  setSelfModalFilterList,
  changeSelfContentCount,
  resetSelfContentCount,
} = selfReducer.actions

export const filterModalState = (state: RootState) => state.self.isFilterModal
export const filterModalCheckedState = (state: RootState) =>
  state.self.isFilterModalChecked
export const selfCategoryFilterParams = (state: RootState) =>
  state.self.selfCategoryFilterParams
export const selfModalFilterParams = (state: RootState) =>
  state.self.selfModalFilterParams
export const selfMainInfoList = (state: RootState) =>
  state.self.selfMainInfoList
export const selfMainInfoExportList = (state: RootState) =>
  state.self.selfMainInfoExportList
export const selfSpecificInfo = (state: RootState) =>
  state.self.selfSpecificInfo
export const selfCategoryFilterList = (state: RootState) =>
  state.self.selfCategoryFilterList
export const selfModalFilterList = (state: RootState) =>
  state.self.selfModalFilterList
export const selfContentCount = (state: RootState) =>
  state.self.selfContentCount

export default selfReducer.reducer
