import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getAllTasksByIds } from 'utils/API/get-all-tasks-by-ids';
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
    deleteTasks: (state) => {
      state.tasksById = [];
      state.tasksByKeyword = [];
    },
  },
  extraReducers: {
    [getAllTasksByKeyword.fulfilled.type]: (state, action: PayloadAction<Task[]>) => {
      dataHandler(state);
      state.tasksByKeyword = action.payload;
    },
    [getAllTasksByKeyword.pending.type]: loaderHandler,
    [getAllTasksByKeyword.rejected.type]: errorHandler,
    [getAllTasksByIds.fulfilled.type]: (state, action: PayloadAction<Task[]>) => {
      dataHandler(state);
      state.tasksByKeyword = action.payload;
    },
    [getAllTasksByIds.pending.type]: loaderHandler,
    [getAllTasksByIds.rejected.type]: errorHandler,
  },
});

export const { deleteTasks } = searchSlice.actions;

export default searchSlice.reducer;
