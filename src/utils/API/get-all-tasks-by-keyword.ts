import { createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from 'app/store';
import { BASE_URL, SEARCH } from 'utils/const/urls';

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

export const getAllTasksByKeyword = createAsyncThunk(
  'board/getAllTasksByKeyword',
  async (keyword: string, { rejectWithValue, getState }) => {
    const state = getState() as RootState;
    if (!state.auth.token) return;

    try {
      const response: Response = await fetch(BASE_URL + SEARCH + `${String(keyword)}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: state.auth.token,
        },
      });
      const data: Task[] | TaskError = await response.json();
      if (!response.ok) {
        throw new Error(
          `Error! Status: ${(data as TaskError).statusCode}. Message: ${
            (data as TaskError).message
          }`
        );
      }
      return data;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);
