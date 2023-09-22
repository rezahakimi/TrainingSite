import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    drawerOpen: false,
    showSearchBox: false
};

const userSlice = createSlice({
  name: 'user',
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

export const { setDrawerOpen, setShowSearchBox } = userSlice.actions;

export default userSlice.reducer;