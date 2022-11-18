import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { createBoard } from 'utils/API/create-board';
import { createTask } from 'utils/API/create-task';
import { deleteBoard } from 'utils/API/delete-board';
import { deleteBoardColumn } from 'utils/API/delete-board-column';
import { getBoardColumns } from 'utils/API/get-board-columns';
import { getBoards } from 'utils/API/get-boards';
import { getTasksByBoardId } from 'utils/API/get-tasks-by-board-id';
import { getTeammatesByBoardId } from 'utils/API/get-teammates-by-board-id';
import { getUsers } from 'utils/API/get-users';
import { updateBoardColumnTitle } from 'utils/API/update-board-column-title';

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

type Task = {
  _id: string;
  title: string;
  order: string;
  boardId: string;
  columnId: string;
  description: string;
  userId: string;
  users: string[];
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
  tasks: Task[];
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
  tasks: [],
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
    deleteBoardById: (state, action: PayloadAction<string>) => {
      const newBoards = state.boards.filter((item) => item._id !== action.payload);
      state.boards = newBoards;
    },
    deleteColumnById: (state, action: PayloadAction<string>) => {
      const newColumns = state.columns.filter((item) => item._id !== action.payload);
      state.columns = newColumns;
    },
    deleteTaskById: (state, action: PayloadAction<string>) => {
      const newTasks = state.tasks.filter((item) => item._id !== action.payload);
      state.tasks = newTasks;
    },
  },
  extraReducers: {
    [createBoard.fulfilled.type]: (state) => {
      state.isLoading = false;
      state.isError = '';
    },
    [createBoard.pending.type]: loaderHandler,
    [createBoard.rejected.type]: errorHandler,
    [getUsers.fulfilled.type]: (state, action: PayloadAction<User[]>) => {
      state.isLoading = false;
      state.isError = '';
      state.usersTeam = action.payload;
    },
    [getUsers.pending.type]: loaderHandler,
    [getUsers.rejected.type]: errorHandler,
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
    [deleteBoard.fulfilled.type]: dataHandler,
    [deleteBoard.pending.type]: loaderHandler,
    [deleteBoard.rejected.type]: errorHandler,
    [createTask.fulfilled.type]: dataHandler,
    [createTask.pending.type]: loaderHandler,
    [createTask.rejected.type]: errorHandler,
    [getTasksByBoardId.fulfilled.type]: (state, action: PayloadAction<Task[]>) => {
      state.isLoading = false;
      state.isError = '';
      state.tasks = action.payload;
    },
    [getTasksByBoardId.pending.type]: loaderHandler,
    [getTasksByBoardId.rejected.type]: errorHandler,
    [updateBoardColumnTitle.fulfilled.type]: dataHandler,
    [updateBoardColumnTitle.pending.type]: loaderHandler,
    [updateBoardColumnTitle.rejected.type]: errorHandler,
  },
});

export const { addBoards, addBoardId, deleteBoardById, deleteColumnById, deleteTaskById } =
  boardSlice.actions;

export default boardSlice.reducer;
