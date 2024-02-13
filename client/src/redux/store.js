import { configureStore,combineReducers } from '@reduxjs/toolkit'
import userReducer from './reducerSlices/userSlice'
import projectReducer from './reducerSlices/projectSlice'

import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import logger from 'redux-logger'
const persistConfig = {
  key: 'root',
  storage,
}
const reducer = combineReducers({
    user: userReducer,
    project: projectReducer
})
const persistedReducer = persistReducer(persistConfig, reducer)
export const store = configureStore({
  reducer :persistedReducer,
  middleware: ()=> [logger]
})

export const persistor = persistStore(store)