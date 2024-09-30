import { configureStore } from '@reduxjs/toolkit'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { authReducer } from './authReducer'
import { thunk } from 'redux-thunk'

const persistConfig = {
  key: 'root',
  storage,
}

// Wrap the authReducer with persistReducer to persist the state
const persistedReducer = persistReducer(persistConfig, authReducer)

// Configure store using redux toolkit
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(thunk),
})

// Create persistor to persist the store
const persistor = persistStore(store)

export { store, persistor }
