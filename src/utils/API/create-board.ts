import { createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from 'app/store';
import { BOARDS, BASE_URL } from 'utils/const/urls';

type Board = {
  title: string;
  owner: string;
  users: string[];
};

export const createBoard = createAsyncThunk(
  'board/createBoard',
  async (board: Board, { rejectWithValue, getState }) => {
    const { title, owner, users } = board;
    const state = getState() as RootState;
    try {
      const response: Response = await fetch(BASE_URL + BOARDS, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: state.auth.token,
        },
        body: JSON.stringify({
          title,
          owner,
          users,
        }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(`Error! Status: ${data.statusCode}. Message: ${data.message}`);
      }
      return data;
    } catch (error) {
      console.log('Error message: ', (error as Error).message);
      return rejectWithValue((error as Error).message);
    }
  }
);
