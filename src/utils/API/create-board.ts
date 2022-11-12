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
    console.log(JSON.stringify(title));
    try {
      const response = await fetch(BASE_URL + BOARDS, {
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
      console.log(data);
      if (!response.ok) {
        throw new Error(`Error! Status: ${data.statusCode}. Message: ${data.message}`);
      }
      // const token = 'Bearer ' + data.token;
      // dispatch(addLogin(login));
      // dispatch(addToken(token));
      // localStorage.setItem('login', login);
      // localStorage.setItem('token', token);
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
