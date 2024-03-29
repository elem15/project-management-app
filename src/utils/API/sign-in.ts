import { createAsyncThunk } from '@reduxjs/toolkit';
import { addLogin, addToken } from 'app/reducers/authSlice';
import { t } from 'i18next';
import { UserIn } from 'pages/SignIn/SignIn';
import { AUTH_SIGNIN, BASE_URL } from 'utils/const/urls';
import { getUsers } from './get-users';

export const signIn = createAsyncThunk(
  'auth/signIn',
  async (user: UserIn, { rejectWithValue, dispatch }) => {
    let statusCode;
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
      const data = await response.json();
      statusCode = data.statusCode;
      if (!response.ok) {
        throw new Error(`Error! Status: ${data.statusCode}. Message: ${data.message}`);
      }
      const token = 'Bearer ' + data.token;
      dispatch(addLogin(login));
      dispatch(addToken(token));
      localStorage.setItem('login', login);
      localStorage.setItem('token', token);
      await dispatch(await getUsers());
    } catch (error) {
      if (error instanceof Error) {
        if (error.message.startsWith('Error!')) {
          return rejectWithValue({
            statusCode: statusCode,
            message: t('message.signInError'),
            messageForAuth: error.message,
          });
        } else {
          return rejectWithValue({
            statusCode: statusCode,
            message: t('message.signInError'),
            messageForAuth: 'An unexpected error occurred',
          });
        }
      }
    }
  }
);
