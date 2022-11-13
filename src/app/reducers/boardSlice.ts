import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { createBoard } from 'utils/API/create-board';
import { getBoardColumns } from 'utils/API/get-board-columns';
import { getBoards } from 'utils/API/get-boards';
import { getTeammatesByBoardId } from 'utils/API/get-teammates-by-board-id';
import { getUsersBoardSlice } from 'utils/API/get-users-boardSlice';

type User = {
  login: string;
  name: string;
  _id: string;
};

type Board = {
  _id: string;
  title: string;
  owner: string;
  users: string[];
};

type Column = {
  _id: string;
  title: string;
  order: string;
  boardId: string;
};

type BoardType = {
  isLoadingBoardsPage: boolean;
  isLoadingBoardPage: boolean;
  isLoading: boolean;
  isError: string;
  usersTeam: User[];
  boards: Board[];
  columns: Column[];
  teammates: string[];
};

const initialState: BoardType = {
  isLoadingBoardsPage: false,
  isLoadingBoardPage: false,
  isLoading: false,
  isError: '',
  usersTeam: [],
  boards: [],
  columns: [],
  teammates: [],
};

export const boardSlice = createSlice({
  name: 'board',
  initialState,
  reducers: {
    addBoards: (state, action: PayloadAction<Board[]>) => {
      state.boards = action.payload;
    },
  },
  extraReducers: {
    [createBoard.fulfilled.type]: (state) => {
      state.isLoading = false;
      state.isError = '';
    },
    [createBoard.pending.type]: (state) => {
      state.isLoading = true;
      state.isError = '';
    },
    [createBoard.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.isError = action.payload;
    },
    [getUsersBoardSlice.fulfilled.type]: (state, action: PayloadAction<User[]>) => {
      state.isLoading = false;
      state.isError = '';
      state.usersTeam = action.payload;
    },
    [getUsersBoardSlice.pending.type]: (state) => {
      state.isLoading = true;
      state.isError = '';
    },
    [getUsersBoardSlice.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.isError = action.payload;
    },
    [getBoards.fulfilled.type]: (state, action: PayloadAction<Board[]>) => {
      state.isLoadingBoardsPage = false;
      state.isLoading = false;
      state.isError = '';
      state.boards = action.payload;
    },
    [getBoards.pending.type]: (state) => {
      state.isLoadingBoardsPage = true;
      state.isLoading = true;
      state.isError = '';
    },
    [getBoards.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoadingBoardsPage = false;
      state.isLoading = false;
      state.isError = action.payload;
    },
    [getBoardColumns.fulfilled.type]: (state, action: PayloadAction<Column[]>) => {
      state.isLoadingBoardPage = false;
      state.isLoading = false;
      state.isError = '';
      state.columns = action.payload;
    },
    [getBoardColumns.pending.type]: (state) => {
      state.isLoadingBoardPage = true;
      state.isLoading = true;
      state.isError = '';
    },
    [getBoardColumns.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoadingBoardPage = false;
      state.isLoading = false;
      state.isError = action.payload;
    },
    [getTeammatesByBoardId.fulfilled.type]: (state, action: PayloadAction<string[]>) => {
      state.isLoading = false;
      state.isError = '';
      state.teammates = action.payload;
    },
    [getTeammatesByBoardId.pending.type]: (state) => {
      state.isLoading = true;
      state.isError = '';
    },
    [getTeammatesByBoardId.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.isError = action.payload;
    },
  },
});

export const { addBoards } = boardSlice.actions;

export default boardSlice.reducer;
