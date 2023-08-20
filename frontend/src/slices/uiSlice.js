import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    drawerOpen: false,
    showSearchBox: false
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setDrawerOpen: (state, action) => {
      state.drawerOpen = action.payload;
    },
    setShowSearchBox: (state, action) => {
      state.showSearchBox = action.payload;
    },
  },
});

export const { setDrawerOpen, setShowSearchBox } = uiSlice.actions;

export default uiSlice.reducer;