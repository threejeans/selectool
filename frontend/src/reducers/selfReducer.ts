import { RootState } from 'app/store'
import { createSlice } from '@reduxjs/toolkit'

export interface SelfState {
  isFilterModal: boolean
}

const initialState: SelfState = {
  isFilterModal: false,
}

const selfReducer = createSlice({
  name: 'selfReducer',
  initialState: initialState,
  reducers: {
    changeFilterModalStatus: state => {
      state.isFilterModal = !state.isFilterModal
    },
  },
})

export const { changeFilterModalStatus } = selfReducer.actions

export const filterModalState = (state: RootState) => state.self.isFilterModal

export default selfReducer.reducer
