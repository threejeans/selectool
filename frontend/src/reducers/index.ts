import { combineReducers } from '@reduxjs/toolkit'
import authReducer from 'features/auth/authSlice'
import selfReducer from './selfReducer'
import withReducer from './withReducer'
import commonReducer from './commonReducer'
import guideReducer from './guideReducer'
import settingReducer from './settingReducer'

// admin
import adminAuthReducer from 'features/admin/auth/adminAuthSlice'
import adminContentsReducer from 'features/admin/contents/adminContentsSlice'
import adminDataReducer from 'features/admin/data/adminDataSlice'
import adminAlarmReducer from 'features/admin/alarm/adminAlarmSlice'

const rootReducer = combineReducers({
  auth: authReducer,
  self: selfReducer,
  with: withReducer,
  guide: guideReducer,
  setting: settingReducer,
  common: commonReducer,
  adminAuth: adminAuthReducer,
  adminContents: adminContentsReducer,
  adminData: adminDataReducer,
  adminAlarm: adminAlarmReducer,
})

export default rootReducer
