import { createSlice } from '@reduxjs/toolkit';

type Popup = {
  isPopup: boolean;
};

const initialState: Popup = {
  isPopup: false,
};

export const boardSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    togglePopup: (state) => {
      state.isPopup = !state.isPopup;
      document.body.classList.toggle('stop-scrolling');
    },
  },
});

export const { togglePopup } = boardSlice.actions;

export default boardSlice.reducer;
