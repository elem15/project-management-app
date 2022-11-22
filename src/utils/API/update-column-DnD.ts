import { createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from 'app/store';
import { BASE_URL, COLUMNS_SET } from 'utils/const/urls';

type Column = {
  _id: string;
  order: number;
};

type ColumnError = {
  statusCode: string;
  message: string;
};

export const updateColumnAfterDnD = createAsyncThunk(
  'board/updateColumnAfterDnD',
  async (column: Column[], { rejectWithValue, getState }) => {
    const state = getState() as RootState;
    if (!state.auth.token) return;
    try {
      const response: Response = await fetch(BASE_URL + COLUMNS_SET, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: state.auth.token,
        },
        body: JSON.stringify(column),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(
          `Error! Status: ${(data as ColumnError).statusCode}. Message: ${
            (data as ColumnError).message
          }`
        );
      }
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);
