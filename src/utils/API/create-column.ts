import { createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from 'app/store';
import { t } from 'i18next';
import { BOARDS, BASE_URL, COLUMNS } from 'utils/const/urls';
import { openNotificationWithIcon } from 'utils/Notification/Notification';

type Column = {
  title: string;
  order: number;
  boardId: string;
};

type ColumnError = {
  statusCode: number;
  message: string;
};

export const createColumn = createAsyncThunk(
  'board/createColumn',
  async (column: Column, { rejectWithValue, getState }) => {
    let statusCode;
    const { title, order, boardId } = column;
    const state = getState() as RootState;
    try {
      const response: Response = await fetch(BASE_URL + BOARDS + `${boardId}/` + COLUMNS, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: state.auth.token,
        },
        body: JSON.stringify({
          title,
          order,
        }),
      });

      const data: Column | ColumnError = await response.json();
      if (!response.ok) {
        statusCode = (data as ColumnError).statusCode;
        throw new Error(
          `Error! Status: ${(data as ColumnError).statusCode}. Message: ${
            (data as ColumnError).message
          }`
        );
      }
      openNotificationWithIcon('success', t('message.createColumnSuccess'));
      return data;
    } catch (error) {
      if (statusCode === 400) {
        openNotificationWithIcon('error', t('message.createColumnError'), t('message.badRequest'));
      } else {
        openNotificationWithIcon(
          'error',
          t('message.createColumnError'),
          t('message.unexpectedError')
        );
      }
      return rejectWithValue((error as Error).message);
    }
  }
);
