import { createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from 'app/store';
import { t } from 'i18next';
import { BASE_URL, TASKS_SET } from 'utils/const/urls';
import { openNotificationWithIcon } from 'utils/Notification/Notification';

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

export const getTasksByBoardId = createAsyncThunk(
  'board/getTasksByBoardId',
  async (boardId: string, { rejectWithValue, getState }) => {
    const state = getState() as RootState;

    try {
      const response: Response = await fetch(BASE_URL + TASKS_SET + `${boardId}/`, {
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
      openNotificationWithIcon(
        'error',
        t('message.getTasksByBoardIdError'),
        (error as Error).message
      );
      return rejectWithValue((error as Error).message);
    }
  }
);
