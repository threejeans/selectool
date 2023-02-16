import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import apiAxios from 'app/apiAxios'
import { RootState } from 'app/store'

const SELF = 'self'
const WITH = 'with'
const GUIDE = 'guide'
export type TYPE_SELF = 'self'
export type TYPE_WITH = 'with'
export type TYPE_GUIDE = 'guide'

export type SelfMainTmpInfo = {
  individualToolNameKr: string
  individualToolNameEn: string
  individualToolInfo: string
  individualToolTopic: string
  individualToolTag: string
  individualToolCountry: string
  individualToolLogo: string
}

export type CoreFuncType = {
  CoreFuncSubTitle: string
  CoreFuncContent: string
}

export type ClientInfoType = {
  ClientImage: string
  ClientSiteUrl: string
}
export type PlanInfoType = {
  PlanName: string
  PlanVolume: string
  PlanPricing: string
  PlanFunc: string[]
}
export type SelfSpecificTmpInfo = {
  individualDetailToolUrl: string
  individualDetailCoreFunc: CoreFuncType[]
  individualDetailClient: ClientInfoType[]
  individualDetailPlan: PlanInfoType[]
  individualDetailAosReviewRate: string | ''
  individualDetailiosReviewRate: string | ''
}

type ContentsType = {
  index: number
  type: TYPE_SELF | TYPE_WITH | TYPE_GUIDE
  title: string
  description: string
}

export interface ContentsState {
  contentsList: ContentsType[]
  selfMainTmpInfo: SelfMainTmpInfo
  selfSpecificTmpInfo: SelfSpecificTmpInfo
  status: 'idle' | 'loading' | 'success' | 'failed'
}

const initialState: ContentsState = {
  contentsList: [
    {
      index: 1,
      type: SELF,
      title: '피그마',
      description:
        '15글자 이상은 단축되도록 css로 처리를 했는데, 적용이 되는 지 확인이 필요한 부분',
    },
    { index: 2, type: SELF, title: '피그마', description: '메신저기반' },
    { index: 3, type: SELF, title: '피그마', description: '메신저기반' },
    { index: 4, type: SELF, title: '피그마', description: '메신저기반' },
    { index: 5, type: SELF, title: '피그마', description: '메신저기반' },
    { index: 6, type: SELF, title: '피그마', description: '메신저기반' },
    { index: 7, type: SELF, title: '피그마', description: '메신저기반' },
    { index: 8, type: SELF, title: '피그마', description: '메신저기반' },
    { index: 9, type: SELF, title: '피그마', description: '메신저기반' },
    { index: 10, type: SELF, title: '피그마', description: '메신저기반' },
    { index: 11, type: SELF, title: '피그마', description: '메신저기반' },
    { index: 12, type: SELF, title: '피그마', description: '메신저기반' },
  ],
  selfMainTmpInfo: {
    individualToolNameKr: '',
    individualToolNameEn: '',
    individualToolInfo: '',
    individualToolTopic: '',
    individualToolTag: '',
    individualToolCountry: '',
    individualToolLogo: '',
  },
  selfSpecificTmpInfo: {
    individualDetailToolUrl: '',
    individualDetailCoreFunc: [],
    individualDetailClient: [],
    individualDetailPlan: [],
    individualDetailAosReviewRate: '',
    individualDetailiosReviewRate: '',
  },
  status: 'idle',
}
export const getContentsList = createAsyncThunk(
  'adminContents/getContentsList',
  async ({ type }: any, { rejectWithValue }) => {
    try {
      const response = await apiAxios.get(`/admin/contents/${type}`)
      console.log(response) //
      return response
    } catch (error: any) {
      console.error(error) //
      return rejectWithValue(error.message)
    }
  },
)

export const createSelfMainTmpInfo = createAsyncThunk(
  'adminContents/createSelfMainTmpInfo',
  async (params: SelfMainTmpInfo, { rejectWithValue }) => {
    try {
      const response = await apiAxios.post('/admin/self/main', params)
      return response
    } catch (error: any) {
      console.error(error)
      return rejectWithValue(error.message)
    }
  },
)

export const createSelfSpecificTmpInfo = createAsyncThunk(
  'adminContents/createSelfSpecificTmpInfo',
  async (params: SelfSpecificTmpInfo, { rejectWithValue }) => {
    try {
      const response = await apiAxios.post('/admin/self/specific', params)
      return response
    } catch (error: any) {
      console.error(error)
      return rejectWithValue(error.message)
    }
  },
)

export const adminContentsSlice = createSlice({
  name: 'adminContents',
  initialState,
  reducers: {
    sss: (state, { payload }) => {
      state.contentsList = payload
    },
  },
  extraReducers: builder => {
    builder
      .addCase(createSelfMainTmpInfo.pending, state => {
        state.status = 'loading'
      })
      .addCase(createSelfMainTmpInfo.fulfilled, (state, { payload }) => {
        state.selfMainTmpInfo = payload.data
        state.status = 'success'
      })
      .addCase(createSelfMainTmpInfo.rejected, state => {
        state.status = 'failed'
      })
  },
})

export const { sss } = adminContentsSlice.actions

export const selectContentsList = (state: RootState) =>
  state.adminContents.contentsList

export default adminContentsSlice.reducer
