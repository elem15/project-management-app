import { createAsyncThunk } from '@reduxjs/toolkit';
import { updateColumn } from 'app/reducers/boardSlice';
import { RootState } from 'app/store';
import { BASE_URL, BOARDS, COLUMNS } from 'utils/const/urls';

type Column = {
  title: string;
  order: number;
  columnId: string;
  boardId: string;
};

type ColumnError = {
  statusCode: string;
  message: string;
};

export const updateBoardColumnTitle = createAsyncThunk(
  'board/updateBoardColumnTitle',
  async (column: Column, { rejectWithValue, getState, dispatch }) => {
    const { title, order, columnId, boardId } = column;
    const state = getState() as RootState;
    if (!state.auth.token) return;
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
        throw new Error(
          `Error! Status: ${(data as ColumnError).statusCode}. Message: ${
            (data as ColumnError).message
          }`
        );
      }
      dispatch(updateColumn({ ...column, _id: columnId }));
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);
