import { createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from 'app/store';
import { t } from 'i18next';
import { BOARDS, BASE_URL, COLUMNS } from 'utils/const/urls';

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
      return data;
    } catch (error) {
      return rejectWithValue({ statusCode: statusCode, message: t('message.createColumnError') });
    }
  }
);
