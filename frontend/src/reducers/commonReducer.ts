import { RootState } from 'app/store'
import { createSlice } from '@reduxjs/toolkit'

export interface CommonState {
  searchValue: string
  isNoSearchData: boolean
}

const initialState: CommonState = {
  searchValue: '',
  isNoSearchData: false,
}

const commonReducer = createSlice({
  name: 'commonReducer',
  initialState: initialState,
  reducers: {
    setSearchValue(state, { payload: input }) {
      return { ...state, searchValue: input }
    },
    changeSearchDataStatus(state, { payload: input }) {
      return { ...state, isNoSearchData: input }
    },
  },
})

export const { setSearchValue, changeSearchDataStatus } = commonReducer.actions

export const searchValue = (state: RootState) => state.common.searchValue
export const searchDataState = (state: RootState) => state.common.isNoSearchData

export default commonReducer.reducer
