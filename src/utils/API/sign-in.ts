import { createAsyncThunk } from '@reduxjs/toolkit';
import { host } from '../const/host';

type User = {
  login: string;
  password: string;
};

export const signIn = createAsyncThunk('data/signIn', async (user: User, { rejectWithValue }) => {
  try {
    const response = await fetch(`${host}/auth/signin`, {
      method: 'POST',
      body: JSON.stringify(user),
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(`Error! Status: ${result.statusCode}. Message: ${result.message}`);
    }
    localStorage.setItem('token', JSON.stringify(result.token));

    return result;
  } catch (error) {
    if (error instanceof Error) {
      console.log('Error message: ', error.message);
      return rejectWithValue(error.message);
    } else {
      console.log('Unexpected error: ', error);
      return rejectWithValue('An unexpected error occurred');
    }
  }
});
