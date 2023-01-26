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
    openFilterModal: state => {
      state.isFilterModal = true
    },
    closeFilterModal: state => {
      state.isFilterModal = false
    },
  },
})

export const { openFilterModal, closeFilterModal } = selfReducer.actions

export default selfReducer.reducer
