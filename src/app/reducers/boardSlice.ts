import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { createBoard } from 'utils/API/create-board';
import { getBoards } from 'utils/API/get-boards';
import { getUsersBoardSlice } from 'utils/API/get-users-boardSlice';

type User = {
  login: string;
  name: string;
  _id: string;
};

type Boards = {
  _id: string;
  title: string;
  owner: string;
  users: string[];
};

type BoardType = {
  isPopup: boolean;
  isError: string;
  usersTeam: User[];
  boards: Boards[];
};

const initialState: BoardType = {
  isPopup: false,
  isError: '',
  usersTeam: [],
  boards: [],
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
    addBoards: (state, action: PayloadAction<Boards[]>) => {
      state.boards = action.payload;
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
    [getUsersBoardSlice.fulfilled.type]: (state, action: PayloadAction<User[]>) => {
      state.isError = '';
      state.usersTeam = action.payload;
    },
    [getUsersBoardSlice.pending.type]: (state) => {
      state.isError = '';
    },
    [getUsersBoardSlice.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isError = action.payload;
    },
    // [getBoards.fulfilled.type]: (state, action: PayloadAction<Boards[]>) => {
    //   state.isError = '';
    //   state.boards = action.payload;
    // },
    [getBoards.pending.type]: (state) => {
      state.isError = '';
    },
    [getBoards.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isError = action.payload;
    },
  },
});

export const { togglePopup, addBoards } = boardSlice.actions;

export default boardSlice.reducer;
