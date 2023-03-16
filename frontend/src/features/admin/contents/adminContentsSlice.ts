import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import apiAxios from 'app/apiAxios'
import { RootState } from 'app/store'
import { toast } from 'react-toastify'
import {
  CategoryType,
  CorpType,
  GuideType,
  ToolType,
  TypeId,
  TYPE_GUIDE,
  TYPE_SELF,
  TYPE_WITH,
} from 'types/types'

const SELF = 'self'
const WITH = 'with'
const GUIDE = 'guide'

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
  currentContent: ToolType | GuideType | CorpType | undefined
  currentType: TYPE_SELF | TYPE_WITH | TYPE_GUIDE | undefined
  isModified: boolean
  tmpTool: ToolType
  tmpGuide: GuideType
  tmpCorp: CorpType
  status: 'idle' | 'loading' | 'success' | 'failed'
}

const initialState: ContentsState = {
  contentsList: [],
  currentContent: undefined,
  currentType: undefined,
  isModified: false,
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
  tmpCorp: {
    nameKr: '',
    nameEn: '',
    info: '',
    teamNameKr: '',
    teamNameEn: '',
    categories: [],
    image: '',
    url: '',
    content: '',
    cultures: [],
    branches: [],
    tools: [],
  },
  status: 'idle',
}
const getApiUrl = (type: TYPE_SELF | TYPE_WITH | TYPE_GUIDE) => {
  switch (type) {
    case 'self':
      return '/self/tools'
    case 'guide':
      return '/board/guides'
    case 'with':
      return '/with/corps'
  }
}

export const getContentsList = createAsyncThunk(
  'adminContents/getContentsList',
  async ({ type }: TypeId, { rejectWithValue }) => {
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
  async ({ type, id }: TypeId, { rejectWithValue }) => {
    try {
      const response = await apiAxios.get(`${getApiUrl(type)}/${id}`)
      const { data } = response
      return { type: type, data: data }
    } catch (error: any) {
      console.error(error) //
      return rejectWithValue(error.message)
    }
  },
)

export const deleteItem = createAsyncThunk(
  'adminContents/deleteGuide',
  async ({ type, id }: TypeId, { rejectWithValue }) => {
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
export const createCorp = createAsyncThunk(
  'adminContents/createCorp',
  async (data: CorpType, { rejectWithValue }) => {
    try {
      const response = await apiAxios.post('/with/corps', data)
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

export const searchClient = createAsyncThunk(
  'adminContents/searchClient',
  async (key: string, { rejectWithValue }) => {
    try {
      const response = await apiAxios.get(`/self/clients?name=${key}`)
      // console.log('Async Response', response)
      return response.data
    } catch (error: any) {
      console.error(error) //
      return rejectWithValue(error.message)
    }
  },
)

export const searchTool = createAsyncThunk(
  'adminContents/searchTool',
  async (key: string, { rejectWithValue }) => {
    try {
      const response = await apiAxios.get(`/self/tools?name=${key}`)
      // console.log('Async Response', response)
      return response.data
    } catch (error: any) {
      console.error(error) //
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
      state.tmpTool = initialState.tmpTool
    },
    guideSave: (state, { payload }) => {
      console.log(payload)
      state.tmpGuide = payload
    },
    resetTmpGuide: state => {
      state.tmpGuide = initialState.tmpGuide
    },
    withCorpSave: (state, { payload }) => {
      state.tmpCorp = payload
    },
    resetTmpCorp: state => {
      state.tmpCorp = initialState.tmpCorp
    },
    resetContentList: state => {
      state.contentsList = []
    },
    startModify: state => {
      state.isModified = true
    },
    stopModify: state => {
      state.isModified = false
    },
    resetCurrent: state => {
      state.currentContent = undefined
      state.currentType = undefined
    },
  },
  extraReducers: builder => {
    builder
      .addCase(getContent.pending, state => {
        state.status = 'loading'
      })
      .addCase(getContent.fulfilled, (state, { payload }) => {
        state.currentContent = payload.data
        state.currentType = payload.type
        state.status = 'success'
      })
      .addCase(getContent.rejected, state => {
        state.currentContent = undefined
        state.currentType = undefined
        state.status = 'failed'
      })
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
  withCorpSave,
  resetTmpCorp,
  resetContentList,
  startModify,
  stopModify,
  resetCurrent,
} = adminContentsSlice.actions

export const selectLoading = (state: RootState) => state.adminContents.status
export const selectCurrentContent = (state: RootState) =>
  state.adminContents.currentContent
export const selectCurrentType = (state: RootState) =>
  state.adminContents.currentType
export const selectIsModified = (state: RootState) =>
  state.adminContents.isModified
export const selectContentsList = (state: RootState) =>
  state.adminContents.contentsList
export const selectTmpTool = (state: RootState) => state.adminContents.tmpTool
export const selectTmpGuide = (state: RootState) => state.adminContents.tmpGuide
export const selectTmpCorp = (state: RootState) => state.adminContents.tmpCorp

export default adminContentsSlice.reducer
