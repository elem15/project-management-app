import { createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from 'app/store';
import { BOARDS, BASE_URL, COLUMNS } from 'utils/const/urls';

type Column = {
  title: string;
  order: string;
  boardId: string;
};

export const createColumn = createAsyncThunk(
  'board/createColumn',
  async (column: Column, { rejectWithValue, getState }) => {
    const { title, order, boardId } = column;
    const state = getState() as RootState;
    try {
      const response = await fetch(BASE_URL + BOARDS + `${boardId}/` + COLUMNS, {
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

      const data = await response.json();
      if (!response.ok) {
        throw new Error(`Error! Status: ${data.statusCode}. Message: ${data.message}`);
      }
    } catch (error) {
      if (error instanceof Error) {
        console.log('Error message: ', error.message);
        return rejectWithValue(error.message);
      } else {
        console.log('Unexpected error: ', error);
        return rejectWithValue('An unexpected error occurred');
      }
    }
  }
);
