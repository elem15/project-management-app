import { createAsyncThunk } from '@reduxjs/toolkit';
import { updateColumn } from 'app/reducers/boardSlice';
import { RootState } from 'app/store';
import { t } from 'i18next';
import { BASE_URL, BOARDS, COLUMNS } from 'utils/const/urls';
import { openNotificationWithIcon } from 'utils/Notification/Notification';

type Column = {
  title: string;
  order: number;
  columnId: string;
  boardId: string;
  isSwap: boolean;
};

type ColumnError = {
  statusCode: string;
  message: string;
};

export const updateBoardColumnTitle = createAsyncThunk(
  'board/updateBoardColumnTitle',
  async (column: Column, { rejectWithValue, getState, dispatch }) => {
    let statusCode;
    const { title, order, columnId, boardId, isSwap } = column;
    const state = getState() as RootState;

    try {
      const response: Response = await fetch(
        BASE_URL + BOARDS + `${boardId}/` + COLUMNS + `${columnId}/`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: state.auth.token,
          },
          body: JSON.stringify({
            title,
            order,
          }),
        }
      );
      const data = await response.json();
      if (!response.ok) {
        statusCode = data.statusCode;
        throw new Error(
          `Error! Status: ${(data as ColumnError).statusCode}. Message: ${
            (data as ColumnError).message
          }`
        );
      }
      dispatch(updateColumn({ ...column, _id: columnId }));
      if (!isSwap) {
        openNotificationWithIcon('success', t('message.updateColumnTitleSuccess'));
      }
    } catch (error) {
      if (statusCode === 400) {
        openNotificationWithIcon(
          'error',
          t('message.updateColumnTitleError'),
          t('message.badRequest')
        );
      } else {
        openNotificationWithIcon(
          'error',
          t('message.updateColumnTitleError'),
          t('message.unexpectedError')
        );
      }

      return rejectWithValue((error as Error).message);
    }
  }
);
