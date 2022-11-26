import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getAllTasksByKeyword } from 'utils/API/get-all-tasks-by-keyword';

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

type SearchType = {
  tasksById: Task[];
  tasksByKeyword: Task[];
  isLoading: boolean;
  isError: string;
};

const initialState: SearchType = {
  tasksById: [],
  tasksByKeyword: [],
  isLoading: false,
  isError: '',
};

const dataHandler = (state: SearchType) => {
  state.isLoading = false;
  state.isError = '';
};

const loaderHandler = (state: SearchType) => {
  state.isLoading = true;
  state.isError = '';
};

const errorHandler = (state: SearchType, action: PayloadAction<string>) => {
  state.isLoading = false;
  state.isError = action.payload;
};

export const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    // addBoards: (state, action: PayloadAction<Board[]>) => {
    //   state.boards = action.payload;
    // },
    // addBoardId: (state, action: PayloadAction<string>) => {
    //   state.boardId = action.payload;
    // },
    // deleteBoardById: (state, action: PayloadAction<string>) => {
    //   const newBoards = state.boards.filter((item) => item._id !== action.payload);
    //   state.boards = newBoards;
    // },
    // deleteTaskById: (state, action: PayloadAction<string>) => {
    //   const newTasks = state.tasks.filter((item) => item._id !== action.payload);
    //   state.tasks = newTasks;
    // },
  },
  extraReducers: {
    [getAllTasksByKeyword.fulfilled.type]: (state, action: PayloadAction<Task[]>) => {
      state.isLoading = false;
      state.isError = '';
      state.tasksByKeyword = action.payload;
    },
    [getAllTasksByKeyword.pending.type]: loaderHandler,
    [getAllTasksByKeyword.rejected.type]: errorHandler,
  },
});

// export const { addBoards, addBoardId, deleteBoardById, deleteTaskById } = searchSlice.actions;

export default searchSlice.reducer;
