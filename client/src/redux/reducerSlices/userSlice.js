import {  createSlice } from '@reduxjs/toolkit';
const initialState = {
  username: 'ram',
  age:0
};

// Redux Toolkit slice
export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    incrementAge: (state) => {
      state.age = state.age + 1
    }
  },
});
export const { incrementAge } = userSlice.actions;
export default userSlice.reducer;