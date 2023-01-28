import { combineReducers } from '@reduxjs/toolkit'
import authReducer from 'features/auth/authSlice'
import selfReducer from './selfReducer'

const rootReducer = combineReducers({
  auth: authReducer,
  self: selfReducer,
})

export default rootReducer
