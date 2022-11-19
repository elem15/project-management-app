import { createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from 'app/store';
import { BOARDS, BASE_URL, COLUMNS, TASKS } from 'utils/const/urls';

type Task = {
  title: string;
  order: number;
  description: string;
  userId: string;
  users: string[];
  boardId: string;
  columnId: string;
};

type TaskError = {
  statusCode: string;
  message: string;
};

export const createTask = createAsyncThunk(
  'board/createTask',
  async (task: Task, { rejectWithValue, getState }) => {
    const { title, order, description, userId, users, boardId, columnId } = task;
    const state = getState() as RootState;
    try {
      const response: Response = await fetch(
        BASE_URL + BOARDS + `${boardId}/` + COLUMNS + `${columnId}/` + TASKS,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: state.auth.token,
          },
          body: JSON.stringify({
            title,
            order,
            description,
            userId,
            users,
          }),
        }
      );
      const data: Task | TaskError = await response.json();
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
