import { createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from 'app/store';
import { t } from 'i18next';
import { BASE_URL, BOARDS, COLUMNS } from 'utils/const/urls';
import { openNotificationWithIcon } from 'utils/Notification/Notification';

type Column = {
  columnId: string;
  title?: string;
  order?: number;
  boardId: string;
};

type ColumnError = {
  statusCode: string;
  message: string;
};

export const deleteBoardColumn = createAsyncThunk(
  'board/deleteBoardColumn',
  async (column: Column, { rejectWithValue, getState }) => {
    const { columnId, boardId } = column;
    const state = getState() as RootState;
    try {
      const response: Response = await fetch(
        BASE_URL + BOARDS + `${boardId}/` + COLUMNS + `${columnId}/`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            Authorization: state.auth.token,
          },
        }
      );
      const data = await response.json();
      if (!response.ok) {
        throw new Error(
          `Error! Status: ${(data as ColumnError).statusCode}. Message: ${
            (data as ColumnError).message
          }`
        );
      }
      openNotificationWithIcon('success', t('message.deleteColumnSuccess'));
      return data;
    } catch (error) {
      openNotificationWithIcon(
        'error',
        t('message.deleteColumnError'),
        t('message.unexpectedError')
      );
      return rejectWithValue((error as Error).message);
    }
  }
);
