import { createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from 'app/store';
import { t } from 'i18next';
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
  statusCode: number;
  message: string;
};

export const getAllTasksByKeyword = createAsyncThunk(
  'board/getAllTasksByKeyword',
  async (keyword: string, { rejectWithValue, getState }) => {
    let statusCode;
    const state = getState() as RootState;

    try {
      const response: Response = await fetch(BASE_URL + SEARCH + `${String(keyword)}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: state.auth.token,
        },
      });
      const data: Task[] | TaskError = await response.json();
      if (!response.ok) {
        statusCode = (data as TaskError).statusCode;
        throw new Error(
          `Error! Status: ${(data as TaskError).statusCode}. Message: ${
            (data as TaskError).message
          }`
        );
      }
      return data;
    } catch (error) {
      return rejectWithValue({
        statusCode: statusCode,
        message: t('message.getAllTasksByKeywordError'),
      });
    }
  }
);
