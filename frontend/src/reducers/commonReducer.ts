import { RootState } from 'app/store'
import { createSlice } from '@reduxjs/toolkit'

export interface CommonState {
  searchValue: string
  isMenuOpen: boolean
  isNoSearchData: boolean
  isRegisterModal: boolean
  noSearchValue: string
}

const initialState: CommonState = {
  searchValue: '',
  isMenuOpen: false,
  isNoSearchData: false,
  isRegisterModal: false,
  noSearchValue: '',
}

const commonReducer = createSlice({
  name: 'commonReducer',
  initialState: initialState,
  reducers: {
    setSearchValue(state, { payload: input }) {
      return { ...state, searchValue: input }
    },
    setNoSearchValue(state, { payload: input }) {
      return { ...state, noSearchValue: input }
    },
    changeMenuStatus: state => {
      state.isMenuOpen = !state.isMenuOpen
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
  setNoSearchValue,
  changeMenuStatus,
  changeSearchDataStatus,
  changeRegisterModalStatus,
} = commonReducer.actions

export const menuStatus = (state: RootState) => state.common.isMenuOpen
export const searchValue = (state: RootState) => state.common.searchValue
export const noSearchValue = (state: RootState) => state.common.noSearchValue
export const searchDataState = (state: RootState) => state.common.isNoSearchData
export const registerModalState = (state: RootState) =>
  state.common.isRegisterModal

export default commonReducer.reducer
