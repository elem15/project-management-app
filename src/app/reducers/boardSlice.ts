import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { createBoard } from 'utils/API/create-board';
import { deleteBoardColumn } from 'utils/API/delete-board-column';
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
  boardId: string;
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
  boardId: '',
};

const dataHandler = (state: BoardType) => {
  state.isLoading = false;
  state.isError = '';
};

const loaderHandler = (state: BoardType) => {
  state.isLoading = true;
  state.isError = '';
};

const errorHandler = (state: BoardType, action: PayloadAction<string>) => {
  state.isLoading = false;
  state.isError = action.payload;
};

export const boardSlice = createSlice({
  name: 'board',
  initialState,
  reducers: {
    addBoards: (state, action: PayloadAction<Board[]>) => {
      state.boards = action.payload;
    },
    addBoardId: (state, action: PayloadAction<string>) => {
      state.boardId = action.payload;
    },
  },
  extraReducers: {
    [createBoard.fulfilled.type]: (state) => {
      state.isLoading = false;
      state.isError = '';
    },
    [createBoard.pending.type]: loaderHandler,
    [createBoard.rejected.type]: errorHandler,
    [getUsersBoardSlice.fulfilled.type]: (state, action: PayloadAction<User[]>) => {
      state.isLoading = false;
      state.isError = '';
      state.usersTeam = action.payload;
    },
    [getUsersBoardSlice.pending.type]: loaderHandler,
    [getUsersBoardSlice.rejected.type]: errorHandler,
    [getBoards.fulfilled.type]: (state, action: PayloadAction<Board[]>) => {
      state.isLoadingBoardsPage = false;
      state.isLoading = false;
      state.isError = '';
      state.boards = action.payload;
    },
    [getBoards.pending.type]: (state) => {
      state.isLoadingBoardsPage = true;
      loaderHandler(state);
    },
    [getBoards.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoadingBoardsPage = false;
      errorHandler(state, action);
    },
    [getBoardColumns.fulfilled.type]: (state, action: PayloadAction<Column[]>) => {
      state.isLoadingBoardPage = false;
      state.isLoading = false;
      state.isError = '';
      state.columns = action.payload;
    },
    [getBoardColumns.pending.type]: (state) => {
      state.isLoadingBoardPage = true;
      loaderHandler(state);
    },
    [getBoardColumns.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoadingBoardPage = false;
      errorHandler(state, action);
    },
    [getTeammatesByBoardId.fulfilled.type]: (state, action: PayloadAction<string[]>) => {
      state.isLoading = false;
      state.isError = '';
      state.teammates = action.payload;
    },
    [getTeammatesByBoardId.pending.type]: loaderHandler,
    [getTeammatesByBoardId.rejected.type]: errorHandler,
    [deleteBoardColumn.fulfilled.type]: dataHandler,
    [deleteBoardColumn.pending.type]: loaderHandler,
    [deleteBoardColumn.rejected.type]: errorHandler,
  },
});

export const { addBoards, addBoardId } = boardSlice.actions;

export default boardSlice.reducer;
