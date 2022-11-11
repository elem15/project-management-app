import { createAsyncThunk } from '@reduxjs/toolkit';
import { addLogin, addToken } from 'features/auth/authSlice';
import { UserIn } from 'pages/SignIn/SignIn';
import { AUTH_SIGNIN, BASE_URL } from 'utils/const/urls';

export const signIn = createAsyncThunk(
  'auth/signIn',
  async (user: UserIn, { rejectWithValue, dispatch }) => {
    const { login, password } = user;
    try {
      const response = await fetch(BASE_URL + AUTH_SIGNIN, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          login,
          password,
        }),
      });
      console.log(await response);
      const data = await response.json();
      console.log(data);
      if (!response.ok) {
        throw new Error(`Error! Status: ${data.statusCode}. Message: ${data.message}`);
      }
      dispatch(addLogin(login));
      dispatch(addToken('Bearer ' + data.token));
      // const userResponse = await fetch(BASE_URL + USERS + data._id);
      // const { name } = await userResponse.json();
      // dispatch(addName(name));
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
