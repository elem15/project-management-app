import { createAsyncThunk } from '@reduxjs/toolkit';
import { signOut } from 'app/reducers/authSlice';
import { RootState } from 'app/store';
import { BASE_URL, BOARDS, COLUMNS, TASKS } from 'utils/const/urls';

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

type TaskId = {
  boardId: string;
  columnId: string;
};

type TaskError = {
  statusCode: string;
  message: string;
};

export const getTasks = createAsyncThunk(
  'board/getTasks',
  async (taskId: TaskId, { rejectWithValue, dispatch, getState }) => {
    const { boardId, columnId } = taskId;
    const state = getState() as RootState;
    if (!state.auth.token) return;
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
      const data: Task[] | TaskError = await response.json();
      if (!response.ok) {
        dispatch(signOut());
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
