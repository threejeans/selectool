import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import apiAxios from 'app/apiAxios'
import { RootState } from 'app/store'
import { rmSync } from 'fs'
import { GuideType } from 'types/types'

export interface GuideState {
  randomList: number[]
  guideList: GuideType[]
  categories: string[]
  status: 'idle' | 'loading' | 'success' | 'failed'
}

const initialState: GuideState = {
  randomList: [],
  guideList: [],
  categories: [],
  status: 'idle',
}

export const getGuideList = createAsyncThunk(
  'guide/getGuideList',
  async (_, { rejectWithValue }) => {
    try {
      const response = await apiAxios.get('board/nomember/guides')
      return response.data
    } catch (error: any) {
      return rejectWithValue(error.message)
    }
  },
)

const guideSlice = createSlice({
  name: 'guide',
  initialState: initialState,
  reducers: {
    setRandomList: state => {
      const size = state.guideList.length
      const result = new Set<number>([])
      if (size > 2) {
        while (result.size < 3) {
          result.add(Math.floor(Math.random() * size))
        }
      }
      console.log(result)
      state.randomList = Array.from(result)
    },
    setCategoryFilter: (state, { payload }) => {
      state.categories = payload
    },
  },
  extraReducers: builder => {
    builder
      .addCase(getGuideList.pending, state => {
        state.status = 'loading'
      })
      .addCase(getGuideList.fulfilled, (state, { payload }) => {
        state.guideList = payload
        state.status = 'success'
      })
      .addCase(getGuideList.rejected, state => {
        state.status = 'failed'
      })
  },
})
export const { setRandomList, setCategoryFilter } = guideSlice.actions
export default guideSlice.reducer

export const selectGuideList = (state: RootState) => state.guide.guideList
export const selectRandomList = (state: RootState) => state.guide.randomList
export const selectCategories = (state: RootState) => state.guide.categories

export const getTextDate = (date: Date | string | undefined) => {
  console.log(date)
  if (date) {
    if (typeof date === 'string') return date
    else if (typeof date === typeof Date)
      return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`
  } else ''
}

export const getCategoryList = (value: string) => {
  switch (value) {
    case '디자인':
      return ['일반 디자인', 'UI', 'UX', 'BX', '타이포그래피', '리소스']
    case '개발':
      return [
        '일반 개발',
        '웹 개발',
        'java',
        'react',
        'vue.js',
        'angular',
        ' node.js',
        'python',
        'PHP',
        'infra',
        'structure',
        'database',
        'andriod',
        'ios',
        'git',
        '빅데이터/AI/머신러닝',
        '노코드/로우코드',
        '업무 자동화',
      ]
    case '기획':
      return [
        '서비스 기획',
        '전략 기획',
        '프로덕트 관리',
        '데이터 분석',
        '조직문화/HR',
        '그로스해킹',
        '고객 지원',
      ]
    case '마케팅':
      return [
        '일반 마케팅',
        '브랜드 마케팅',
        '그로스 마케팅',
        '콘텐츠 마케팅',
        '트렌드',
        'SEO',
      ]
    default:
      return ['기능분류가 선택되지 않았습니다.']
  }
}
