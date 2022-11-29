import { createAsyncThunk } from '@reduxjs/toolkit';
import { addColumns, Column } from 'app/reducers/boardSlice';
import { RootState } from 'app/store';
import { BASE_URL, BOARDS, COLUMNS } from 'utils/const/urls';

type ColumnError = {
  statusCode: string;
  message: string;
};

export const getBoardColumns = createAsyncThunk(
  'board/getBoardColumns',
  async (boardId: string, { rejectWithValue, getState, dispatch }) => {
    const state = getState() as RootState;
    if (!state.auth.token) return;
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
      const columns = (await data) as Column[];
      columns.map((col) => (col.tasks = []));
      dispatch(addColumns(columns));
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);
