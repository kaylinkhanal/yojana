import { configureStore } from '@reduxjs/toolkit'
import userReducer from './reducerSlices/userSlice'

export const store = configureStore({
  reducer: {
    user: userReducer,
  },
})