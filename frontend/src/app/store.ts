import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit'
import authReducer from 'features/auth/authSlice'
import { axiosMiddleware } from './apiAxios'
import rootReducer from 'reducers'

export const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware => {
    return getDefaultMiddleware().concat(axiosMiddleware)
  },
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>
