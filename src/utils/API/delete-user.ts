import { createAsyncThunk } from '@reduxjs/toolkit';
import { signOut } from 'app/reducers/authSlice';
import { RootState } from 'app/store';
import { BASE_URL, USERS } from 'utils/const/urls';

export const deleteUser = createAsyncThunk(
  'auth/deleteUser',
  async (_, { rejectWithValue, dispatch, getState }) => {
    const state = getState() as RootState;
    const { userId, token } = state.auth;
    try {
      const response = await fetch(BASE_URL + USERS + userId, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(`Error! Status: ${data.statusCode}. Message: ${data.message}`);
      }
      localStorage.clear();
      dispatch(signOut());
    } catch (error) {
      if (error instanceof Error) {
        if (error.message.startsWith('Error!')) {
          return rejectWithValue(error.message);
        } else {
          return rejectWithValue('An unexpected error occurred');
        }
      }
    }
  }
);
