import { createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from 'app/store';
import { BOARDS, BASE_URL, COLUMNS, TASKS } from 'utils/const/urls';

type Task = {
  title: string;
  order: string;
  description: string;
  userId: string;
  users: string[];
  boardId: string;
  columnId: string;
};

export const createTask = createAsyncThunk(
  'board/createTask',
  async (task: Task, { rejectWithValue, getState }) => {
    const { title, order, description, userId, users, boardId, columnId } = task;
    const state = getState() as RootState;
    try {
      const response = await fetch(
        BASE_URL + BOARDS + `${boardId}/` + COLUMNS + `${columnId}/` + TASKS,
        {
          mode: 'no-cors',
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
      const data = await response.json();
      if (!response.ok) {
        throw new Error(`Error! Status: ${data.statusCode}. Message: ${data.message}`);
      }
    } catch (error) {
      console.log('Error message: ', (error as Error).message);
      return rejectWithValue((error as Error).message);
    }
  }
);
