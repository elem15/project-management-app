import { createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from 'app/store';
import { t } from 'i18next';
import { BASE_URL, IDS_LIST } from 'utils/const/urls';
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

export const getAllTasksByIds = createAsyncThunk(
  'board/getAllTasksByIds',
  async (ids: string, { rejectWithValue, getState }) => {
    const state = getState() as RootState;
    try {
      const response: Response = await fetch(BASE_URL + IDS_LIST + `${ids}`, {
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
      (data as Task[]).length === 0
        ? openNotificationWithIcon('success', t('message.getAllTasksByIdsEmptySuccess'))
        : openNotificationWithIcon('success', t('message.getAllTasksByIdsSuccess'));
      return data;
    } catch (error) {
      openNotificationWithIcon(
        'error',
        t('message.getAllTasksByIdsError'),
        (error as Error).message
      );
      return rejectWithValue((error as Error).message);
    }
  }
);
