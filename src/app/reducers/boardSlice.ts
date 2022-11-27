import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { createBoard } from 'utils/API/create-board';
import { createColumn } from 'utils/API/create-column';
import { createTask } from 'utils/API/create-task';
import { deleteBoard } from 'utils/API/delete-board';
import { deleteBoardColumn } from 'utils/API/delete-board-column';
import { deleteColumnTask } from 'utils/API/delete-column-task';
import { getBoardColumns } from 'utils/API/get-board-columns';
import { getBoards } from 'utils/API/get-boards';
import { getTasksByBoardId } from 'utils/API/get-tasks-by-board-id';
import { getTitleByBoardId } from 'utils/API/get-title-by-board-id';
import { getUsers } from 'utils/API/get-users';
import { updateBoardColumnTitle } from 'utils/API/update-board-column-title';
import { updateTask } from 'utils/API/update-task';

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
  order: number;
  boardId: string;
};

type Task = {
  _id: string;
  title: string;
  order: number;
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
  title: string;
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
  title: '',
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
    deleteTaskById: (state, action: PayloadAction<string>) => {
      const newTasks = state.tasks.filter((item) => item._id !== action.payload);
      state.tasks = newTasks;
    },
  },
  extraReducers: {
    [createBoard.fulfilled.type]: (state, action: PayloadAction<Board>) => {
      state.isLoading = false;
      state.isError = '';
      state.boards = [...state.boards, action.payload];
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
    [getTitleByBoardId.fulfilled.type]: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.isError = '';
      state.title = action.payload;
    },
    [getTitleByBoardId.pending.type]: loaderHandler,
    [getTitleByBoardId.rejected.type]: errorHandler,
    [deleteBoardColumn.fulfilled.type]: (state, action: PayloadAction<Column>) => {
      const newStateColumnsAfterDelete = state.columns.filter(
        (item) => item._id !== action.payload._id
      );
      const newStateTasksAfterDelete = state.tasks.filter(
        (item) => item.columnId !== action.payload._id
      );
      state.isLoadingBoardPage = false;
      state.columns = newStateColumnsAfterDelete;
      state.tasks = newStateTasksAfterDelete;
      dataHandler(state);
    },
    [deleteBoardColumn.pending.type]: (state) => {
      state.isLoadingBoardPage = true;
      loaderHandler(state);
    },
    [deleteBoardColumn.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoadingBoardPage = false;
      errorHandler(state, action);
    },
    [deleteBoard.fulfilled.type]: (state, action: PayloadAction<Board>) => {
      const newStateBoardsAfterDelete = state.boards.filter(
        (item) => item._id !== action.payload._id
      );
      state.isLoadingBoardPage = false;
      state.boards = newStateBoardsAfterDelete;
      dataHandler(state);
    },
    [deleteBoard.pending.type]: (state) => {
      state.isLoadingBoardsPage = true;
      loaderHandler(state);
    },
    [deleteBoard.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoadingBoardsPage = false;
      errorHandler(state, action);
    },
    [createTask.fulfilled.type]: (state, action: PayloadAction<Task>) => {
      state.isLoading = false;
      state.isError = '';
      state.tasks = [...state.tasks, action.payload];
    },
    [createTask.pending.type]: loaderHandler,
    [createTask.rejected.type]: errorHandler,
    [createColumn.fulfilled.type]: (state, action: PayloadAction<Column>) => {
      state.isLoadingBoardPage = false;
      state.isLoading = false;
      state.isError = '';
      state.columns = [...state.columns, action.payload];
    },
    [createColumn.pending.type]: loaderHandler,
    [createColumn.rejected.type]: errorHandler,
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
    [deleteColumnTask.fulfilled.type]: (state, action: PayloadAction<Task>) => {
      const newStateTasksAfterDelete = state.tasks.filter(
        (item) => item._id !== action.payload._id
      );
      state.isLoadingBoardPage = false;
      state.tasks = newStateTasksAfterDelete;
      dataHandler(state);
    },
    [deleteColumnTask.pending.type]: loaderHandler,
    [deleteColumnTask.rejected.type]: errorHandler,
    [updateTask.fulfilled.type]: (state, action: PayloadAction<Task>) => {
      const newStateTasksAfterUpdate = state.tasks.map(function (item) {
        return item._id == action.payload._id ? action.payload : item;
      });
      state.isLoading = false;
      state.isError = '';
      state.tasks = newStateTasksAfterUpdate;
    },
    [updateTask.pending.type]: loaderHandler,
    [updateTask.rejected.type]: errorHandler,
  },
});

export const { addBoards, addBoardId, deleteBoardById, deleteTaskById } = boardSlice.actions;

export default boardSlice.reducer;
