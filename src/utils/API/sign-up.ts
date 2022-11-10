import { createAsyncThunk } from '@reduxjs/toolkit';
import { HOST } from '../const/host';

type User = {
  name: string;
  login: string;
  password: string;
};

export const signUp = createAsyncThunk('data/signUp', async (user: User, { rejectWithValue }) => {
  try {
    const response = await fetch(`${HOST}/auth/signup`, {
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
