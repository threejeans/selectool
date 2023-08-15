import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit'
import { persistReducer, persistStore } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { axiosMiddleware } from './apiAxios'
import rootReducer from 'reducers'

const persistConfig = {
  key: 'selectool-auth',
  storage,
  whitelist: [
    // 'auth',
    // 'adminAuth',
    // 'adminContents',
    //
  ],
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware => {
    return getDefaultMiddleware({
      serializableCheck: false,
      // {
      //   ignoreActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      // }, // 적용이 안됨
    }).concat(axiosMiddleware)
  },
})
export const persistor = persistStore(store)

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>
