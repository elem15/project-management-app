import { createAsyncThunk } from '@reduxjs/toolkit';
import { signOut } from 'app/reducers/authSlice';
import { RootState } from 'app/store';
import { BASE_URL, USERS } from 'utils/const/urls';

export const getUsers = createAsyncThunk(
  'auth/getUsers',
  async (_, { rejectWithValue, dispatch, getState }) => {
    const state = getState() as RootState;
    if (!state.auth.token) return;
    try {
      const response = await fetch(BASE_URL + USERS, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: state.auth.token,
        },
      });
      const data = await response.json();
      console.log(data);
      if (!response.ok) {
        dispatch(signOut());
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
