import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import apiAxios from 'app/apiAxios'
import { RootState } from 'app/store'
import { toast } from 'react-toastify'
import { CategoryType, GuideType, ToolType } from 'types/dataTypes'

const SELF = 'self'
const WITH = 'with'
const GUIDE = 'guide'
export type TYPE_SELF = 'self'
export type TYPE_WITH = 'with'
export type TYPE_GUIDE = 'guide'

type ContentsType = {
  id: number
  title?: string
  nameKr?: string
  nameEn: string
  info?: string
  content: string
  msg: string
  categories: CategoryType[]
  country: string
  image: string
  isBookmarked: boolean
}

interface ContentsState {
  contentsList: ContentsType[]
  tmpTool: ToolType
  tmpGuide: GuideType
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
  tmpGuide: {
    title: '',
    date: undefined,
    content: '',
    source: '',
    toolName: '',
    func: '',
    categories: [],
    url: '',
    image: '',
    toolImage: '',
  },
  status: 'idle',
}
const getApiUrl = (type: TYPE_SELF | TYPE_WITH | TYPE_GUIDE) => {
  switch (type) {
    case 'self':
      return '/self/tools'
    case 'guide':
      return '/board/guides'
  }
}

export const getContentsList = createAsyncThunk(
  'adminContents/getContentsList',
  async ({ type }: any, { rejectWithValue }) => {
    try {
      const response = await apiAxios.get(`${getApiUrl(type)}`)
      return response.data
    } catch (error: any) {
      console.error(error) //
      return rejectWithValue(error.message)
    }
  },
)

export const getContent = createAsyncThunk(
  'adminContents/getContent',
  async ({ type, id }: any, { rejectWithValue }) => {
    try {
      const response = await apiAxios.get(`${getApiUrl(type)}/${id}`)
      return response.data
    } catch (error: any) {
      console.error(error) //
      return rejectWithValue(error.message)
    }
  },
)

export const deleteItem = createAsyncThunk(
  'adminContents/deleteGuide',
  async ({ type, id }: any, { rejectWithValue }) => {
    try {
      const response = await apiAxios.delete(`${getApiUrl(type)}/${id}`)
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

export const createGuide = createAsyncThunk(
  'adminContents/createGuide',
  async (data: GuideType, { rejectWithValue }) => {
    try {
      const response = await apiAxios.post('/board/guides', data)
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
    guideSave: (state, { payload }) => {
      console.log(payload)
      state.tmpGuide = payload
    },
    resetTmpGuide: state => {
      state.tmpGuide = {
        title: '',
        date: undefined,
        content: '',
        source: '',
        toolName: '',
        func: '',
        categories: [],
        url: '',
        image: '',
        toolImage: '',
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
  guideSave,
  resetTmpGuide,
} = adminContentsSlice.actions

export const selectContentsList = (state: RootState) =>
  state.adminContents.contentsList
export const selectTmpTool = (state: RootState) => state.adminContents.tmpTool
export const selectTmpGuide = (state: RootState) => state.adminContents.tmpGuide

export default adminContentsSlice.reducer
