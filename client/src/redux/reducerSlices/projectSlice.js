import {  createSlice } from '@reduxjs/toolkit';
const initialState = {
  selectedProjectId: null
};

// Redux Toolkit slice
export const projectSlice = createSlice({
  name: 'project',
  initialState,
  reducers: {
    setSelectedProjectId: (state, actions) => {
      return {
        ...state,
        selectedProjectId: actions.payload
      }
    }
  },
});
export const { setSelectedProjectId } = projectSlice.actions;
export default projectSlice.reducer;