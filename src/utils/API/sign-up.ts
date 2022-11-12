import { createAsyncThunk } from '@reduxjs/toolkit';
import { addLogin, addName, addUserId } from 'app/reducers/authSlice';
import { UserUp } from 'pages/SignUp/SignUp';
import { AUTH_SIGNUP, BASE_URL } from 'utils/const/urls';

export const signUp = createAsyncThunk(
  'auth/signUp',
  async (user: UserUp, { rejectWithValue, dispatch }) => {
    const { name, login, password } = user;
    try {
      const response = await fetch(BASE_URL + AUTH_SIGNUP, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          login,
          password,
        }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(`Error! Status: ${data.statusCode}. Message: ${data.message}`);
      }
      dispatch(addLogin(data.login));
      dispatch(addName(data.name));
      dispatch(addUserId(data._id));
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      } else {
        return rejectWithValue('An unexpected error occurred');
      }
    }
  }
);
