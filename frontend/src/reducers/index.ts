import { combineReducers } from '@reduxjs/toolkit'
import authReducer from 'features/auth/authSlice'
import selfReducer from './selfReducer'
import withReducer from './withReducer'
import commonReducer from './commonReducer'

// admin
import adminAuthReducer from 'features/admin/auth/adminAuthSlice'
import adminContentsReducer from 'features/admin/contents/adminContentsSlice'

const rootReducer = combineReducers({
  auth: authReducer,
  self: selfReducer,
  with: withReducer,
  common: commonReducer,
  adminAuth: adminAuthReducer,
  adminContents: adminContentsReducer,
})

export default rootReducer
