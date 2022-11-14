import { createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from 'app/store';
import { BASE_URL, BOARDS, COLUMNS } from 'utils/const/urls';

type Column = {
  columnId: string;
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
    if (!state.auth.token) return;
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
    } catch (error) {
      console.log('Error message: ', (error as Error).message);
      return rejectWithValue((error as Error).message);
    }
  }
);
