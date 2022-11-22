import { createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from 'app/store';
import { BASE_URL, BOARDS, COLUMNS, TASKS } from 'utils/const/urls';

type Task = {
  taskId: string;
  columnId: string;
  boardId: string;
};

type TaskError = {
  statusCode: string;
  message: string;
};

export const deleteColumnTask = createAsyncThunk(
  'board/deleteColumnTask',
  async (task: Task, { rejectWithValue, getState }) => {
    const { taskId, columnId, boardId } = task;
    const state = getState() as RootState;
    if (!state.auth.token) return;
    try {
      const response: Response = await fetch(
        BASE_URL + BOARDS + `${boardId}/` + COLUMNS + `${columnId}/` + TASKS + `${taskId}/`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            Authorization: state.auth.token,
          },
        }
      );
      const data = await response.json();
      if (!response.ok) {
        throw new Error(
          `Error! Status: ${(data as TaskError).statusCode}. Message: ${
            (data as TaskError).message
          }`
        );
      }
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);
