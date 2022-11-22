import { createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from 'app/store';
import { BOARDS, BASE_URL, COLUMNS } from 'utils/const/urls';

type Column = {
  title: string;
  order: number;
  boardId: string;
};

type ColumnError = {
  statusCode: string;
  message: string;
};

export const createColumn = createAsyncThunk(
  'board/createColumn',
  async (column: Column, { rejectWithValue, getState }) => {
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
        throw new Error(
          `Error! Status: ${(data as ColumnError).statusCode}. Message: ${
            (data as ColumnError).message
          }`
        );
      }
      return data;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);
