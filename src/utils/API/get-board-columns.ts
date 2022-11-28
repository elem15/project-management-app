import { createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from 'app/store';
import { t } from 'i18next';
import { BASE_URL, BOARDS, COLUMNS } from 'utils/const/urls';
import { openNotificationWithIcon } from 'utils/Notification/Notification';

type Column = {
  _id: string;
  title: string;
  order: number;
  boardId: string[];
};

type ColumnError = {
  statusCode: string;
  message: string;
};

export const getBoardColumns = createAsyncThunk(
  'board/getBoardColumn',
  async (boardId: string, { rejectWithValue, getState }) => {
    const state = getState() as RootState;

    try {
      const response: Response = await fetch(BASE_URL + BOARDS + `${boardId}/` + COLUMNS, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: state.auth.token,
        },
      });
      const data: Column[] | ColumnError = await response.json();
      if (!response.ok) {
        throw new Error(
          `Error! Status: ${(data as ColumnError).statusCode}. Message: ${
            (data as ColumnError).message
          }`
        );
      }
      return data;
    } catch (error) {
      openNotificationWithIcon(
        'error',
        t('message.getBoardColumnError'),
        t('message.unexpectedError')
      );
      return rejectWithValue((error as Error).message);
    }
  }
);
