import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { createBoard } from 'utils/API/create-board';

type Popup = {
  isPopup: boolean;
  isError: string;
};

const initialState: Popup = {
  isPopup: false,
  isError: '',
};

export const boardSlice = createSlice({
  name: 'board',
  initialState,
  reducers: {
    togglePopup: (state) => {
      state.isPopup = !state.isPopup;
      document.body.classList.toggle('stop-scrolling');
    },
  },
  extraReducers: {
    [createBoard.fulfilled.type]: (state) => {
      state.isError = '';
    },
    [createBoard.pending.type]: (state) => {
      state.isError = '';
    },
    [createBoard.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isError = action.payload;
    },
  },
});

export const { togglePopup } = boardSlice.actions;

export default boardSlice.reducer;
