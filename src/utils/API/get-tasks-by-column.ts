import { createAsyncThunk } from '@reduxjs/toolkit';
import { addTasksToColumn, Task } from 'app/reducers/boardSlice';
import { RootState } from 'app/store';
import { BASE_URL, BOARDS, COLUMNS, TASKS } from 'utils/const/urls';

type ColumnError = {
  statusCode: string;
  message: string;
};

export const getTaskByColumn = createAsyncThunk(
  'board/getTaskByColumn',
  async (columnId: string, { rejectWithValue, getState, dispatch }) => {
    const state = getState() as RootState;
    if (!state.auth.token) return;
    const { boardId } = state.board;
    try {
      const response: Response = await fetch(
        BASE_URL + BOARDS + `${boardId}/` + COLUMNS + `${columnId}/` + TASKS,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: state.auth.token,
          },
        }
      );
      const data: Task[] | ColumnError = await response.json();
      if (!response.ok) {
        throw new Error(
          `Error! Status: ${(data as ColumnError).statusCode}. Message: ${
            (data as ColumnError).message
          }`
        );
      }
      const tasks = data as Task[];
      dispatch(addTasksToColumn({ columnId, tasks }));
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);
