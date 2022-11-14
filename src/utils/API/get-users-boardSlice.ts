import { createAsyncThunk } from '@reduxjs/toolkit';
import { signOut } from 'app/reducers/authSlice';
import { RootState } from 'app/store';
import { BASE_URL, USERS } from 'utils/const/urls';

type User = {
  login?: string;
  name?: string;
  _id?: string;
  statusCode?: string;
  message?: string;
};

export const getUsersBoardSlice = createAsyncThunk(
  'board/getUsersBoardSlice',
  async (_, { rejectWithValue, dispatch, getState }) => {
    const state = getState() as RootState;
    if (!state.auth.token) return;
    try {
      const response: Response = await fetch(BASE_URL + USERS, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: state.auth.token,
        },
      });
      const data: User = await response.json();
      if (!response.ok) {
        dispatch(signOut());
        throw new Error(`Error! Status: ${data.statusCode}. Message: ${data.message}`);
      }
      return data;
    } catch (error) {
      console.log('Error message: ', (error as Error).message);
      return rejectWithValue((error as Error).message);
    }
  }
);
