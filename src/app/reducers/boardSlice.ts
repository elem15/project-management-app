import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { createBoard } from 'utils/API/create-board';
import { getUsersBoard } from 'utils/API/get-users-board';

type User = {
  login: string;
  name: string;
  _id: string;
};

type Popup = {
  isPopup: boolean;
  isError: string;
  usersTeam: User[];
};

const initialState: Popup = {
  isPopup: false,
  isError: '',
  usersTeam: [],
};

// const addUsersTeam = (state: Popup, action: PayloadAction<User[]>) => {
//   state.isError = '';
//   state.usersTeam = action.payload;
// };

export const boardSlice = createSlice({
  name: 'board',
  initialState,
  reducers: {
    togglePopup: (state) => {
      state.isPopup = !state.isPopup;
      document.body.classList.toggle('stop-scrolling');
    },
    // addUsers: (state, action: PayloadAction<User[]>) => {
    //   state.usersTeam = action.payload;
    // },
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
    [getUsersBoard.fulfilled.type]: (state, action: PayloadAction<User[]>) => {
      state.isError = '';
      state.usersTeam = action.payload;
    },
    [getUsersBoard.pending.type]: (state) => {
      state.isError = '';
    },
    [getUsersBoard.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isError = action.payload;
    },
  },
});

export const { togglePopup } = boardSlice.actions;

export default boardSlice.reducer;
