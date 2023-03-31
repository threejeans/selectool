import { RootState } from 'app/store'
import { createSlice } from '@reduxjs/toolkit'

export interface SettingState {
  selectContent: string
}

const initialState: SettingState = {
  selectContent: '혼자써요',
}

const settingReducer = createSlice({
  name: 'settingReducer',
  initialState: initialState,
  reducers: {
    setSelectContent: (state, { payload: input }) => {
      return { ...state, selectContent: input }
    },
  },
})

export const { setSelectContent } = settingReducer.actions

export const selectContent = (state: RootState) => state.setting.selectContent

export default settingReducer.reducer
