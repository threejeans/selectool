import { RootState } from 'app/store'
import { createSlice } from '@reduxjs/toolkit'

export interface CommonState {
  searchValue: string
  isNoSearchData: boolean
  isRegisterModal: boolean
}

const initialState: CommonState = {
  searchValue: '',
  isNoSearchData: false,
  isRegisterModal: false,
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
    changeRegisterModalStatus: state => {
      state.isRegisterModal = !state.isRegisterModal
    },
  },
})

export const {
  setSearchValue,
  changeSearchDataStatus,
  changeRegisterModalStatus,
} = commonReducer.actions

export const searchValue = (state: RootState) => state.common.searchValue
export const searchDataState = (state: RootState) => state.common.isNoSearchData
export const registerModalState = (state: RootState) =>
  state.common.isRegisterModal

export default commonReducer.reducer
