import { configureStore } from '@reduxjs/toolkit'
import { persistReducer, persistStore } from 'redux-persist'

import isDevMode from '../helpers/is-dev-mode'
import persistConfig from './persistConfig'
import rootReducer from './_rootReducer'
import Api from '../api'

// Api middleware
const apiMiddlewares = Api.middlewares

// Persist Reducer
const persistedReducer = persistReducer(persistConfig, rootReducer)

// Create Store
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(apiMiddlewares),
})

// Persisor
const persistor = persistStore(store)

// Add __store in window in dev mode
declare global {
  interface Window {
    __store: any
  }
}

if (isDevMode()) {
  window.__store = store
}

// Infer the `RootState` types from the store itself
export type RootState = ReturnType<typeof store.getState>

export { store, persistor }
