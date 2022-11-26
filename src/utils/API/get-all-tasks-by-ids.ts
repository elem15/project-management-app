import { createAsyncThunk } from '@reduxjs/toolkit';
import { signOut } from 'app/reducers/authSlice';
import { RootState } from 'app/store';
import { BASE_URL, IDS_LIST } from 'utils/const/urls';

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

type TaskError = {
  statusCode: string;
  message: string;
};

export const getAllTasksByIds = createAsyncThunk(
  'board/getAllTasksByIds',
  async (ids: string, { rejectWithValue, dispatch, getState }) => {
    const state = getState() as RootState;
    if (!state.auth.token) return;

    try {
      const response: Response = await fetch(BASE_URL + IDS_LIST + `${ids}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: state.auth.token,
        },
      });
      const data: Task[] | TaskError = await response.json();
      if (!response.ok) {
        dispatch(signOut());
        throw new Error(
          `Error! Status: ${(data as TaskError).statusCode}. Message: ${
            (data as TaskError).message
          }`
        );
      }
      console.log(data);
      return data;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);
