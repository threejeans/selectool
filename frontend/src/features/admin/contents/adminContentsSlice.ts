import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import apiAxios from 'app/apiAxios'
import { RootState } from 'app/store'
import { toast } from 'react-toastify'
import { ToolType } from 'types/dataTypes'

const SELF = 'self'
const WITH = 'with'
const GUIDE = 'guide'
export type TYPE_SELF = 'self'
export type TYPE_WITH = 'with'
export type TYPE_GUIDE = 'guide'

type ContentsType = {
  id: number
  nameKr: string
  nameEn: string
  info: string
  msg: string
  category: string
  country: string
  image: string
  isBookmarked: boolean
}

interface ContentsState {
  contentsList: ContentsType[]
  tmpTool: ToolType
  status: 'idle' | 'loading' | 'success' | 'failed'
}

const initialState: ContentsState = {
  contentsList: [],
  tmpTool: {
    nameKr: '',
    nameEn: '',
    info: '',
    msg: '',
    topic: '',
    categories: [],
    country: '',
    image: '',
    url: '',
    toolFunctions: [],
    clients: [],
    plans: [],
    aos: '',
    ios: '',
  },
  status: 'idle',
}
export const getContentsList = createAsyncThunk(
  'adminContents/getContentsList',
  async ({ type }: any, { rejectWithValue }) => {
    try {
      let contents = ''
      switch (type) {
        case 'self':
          contents = 'tools'
          break
      }
      const response = await apiAxios.get(`/${type}/${contents}`)
      // console.log(response)
      return response.data
    } catch (error: any) {
      console.error(error) //
      return rejectWithValue(error.message)
    }
  },
)

export const createTool = createAsyncThunk(
  'adminContents/createTool',
  async (data: ToolType, { rejectWithValue }) => {
    try {
      const response = await apiAxios.post('/self/tools', data)
      console.log('Async Response', response)
      return response.data
    } catch (error: any) {
      console.error(error) //
      return rejectWithValue(error.message)
    }
  },
)

export const popToast = (text: string | false) => {
  toast(`🚨 ${text != '' ? text : '콘텐츠 내용'}이 입력되지 않았어요!`)
}

export const createSelfSpecificTmpInfo = createAsyncThunk(
  'adminContents/createSelfSpecificTmpInfo',
  async (params: any, { rejectWithValue }) => {
    try {
      const response = await apiAxios.post('/admin/self/specific', params)
      return response.data
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
    selfMainTmpSave: (state, { payload }) => {
      state.tmpTool.nameKr = payload.nameKr
      state.tmpTool.nameEn = payload.nameEn
      state.tmpTool.info = payload.info
      state.tmpTool.msg = payload.msg
      state.tmpTool.topic = payload.topic
      state.tmpTool.categories = payload.categories
      state.tmpTool.country = payload.country
      state.tmpTool.image = payload.image
    },
    selfSpecificTmpSave: (state, { payload }) => {
      state.tmpTool.url = payload.url
      state.tmpTool.toolFunctions = payload.toolFunctions
      state.tmpTool.clients = payload.clients
      state.tmpTool.plans = payload.plans
      state.tmpTool.aos = payload.aos
      state.tmpTool.ios = payload.ios
    },
    withToolSave: (state, { payload }) => {
      state.tmpTool = payload
    },
    resetTmpTool: state => {
      state.tmpTool = {
        nameKr: '',
        nameEn: '',
        info: '',
        msg: '',
        topic: '',
        categories: [],
        country: '',
        image: '',
        url: '',
        toolFunctions: [],
        clients: [],
        plans: [],
        aos: '',
        ios: '',
      }
    },
  },
  extraReducers: builder => {
    builder
      .addCase(getContentsList.pending, state => {
        state.status = 'loading'
      })
      .addCase(getContentsList.fulfilled, (state, { payload }) => {
        state.contentsList = payload
        state.status = 'success'
      })
      .addCase(getContentsList.rejected, state => {
        state.status = 'failed'
      })
      .addCase(createTool.pending, state => {
        state.status = 'loading'
      })
      .addCase(createTool.fulfilled, state => {
        resetTmpTool()
        state.status = 'success'
      })
      .addCase(createTool.rejected, state => {
        state.status = 'failed'
      })
  },
})

export const {
  selfMainTmpSave,
  selfSpecificTmpSave,
  withToolSave,
  resetTmpTool,
} = adminContentsSlice.actions

export const selectContentsList = (state: RootState) =>
  state.adminContents.contentsList
export const selectTmpTool = (state: RootState) => state.adminContents.tmpTool

export default adminContentsSlice.reducer
