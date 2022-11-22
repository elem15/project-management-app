import { createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from 'app/store';
import { BASE_URL, BOARDS, COLUMNS, TASKS } from 'utils/const/urls';

type Task = {
  title: string;
  order: number;
  description: string;
  boardId: string;
  columnId: string;
  taskId: string;
  userId: string;
  users: string[];
};

type TaskError = {
  statusCode: string;
  message: string;
};

export const updateTask = createAsyncThunk(
  'board/updateTask',
  async (task: Task, { rejectWithValue, getState }) => {
    const { title, order, description, boardId, columnId, taskId, userId, users } = task;
    const state = getState() as RootState;
    if (!state.auth.token) return;
    try {
      const response: Response = await fetch(
        BASE_URL + BOARDS + `${boardId}/` + COLUMNS + `${columnId}/` + TASKS + `${taskId}/`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: state.auth.token,
          },
          body: JSON.stringify({
            title,
            order,
            description,
            columnId,
            userId,
            users,
          }),
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
      return data;
    } catch (error) {
      console.log('Error message: ', (error as Error).message);
      return rejectWithValue((error as Error).message);
    }
  }
);
