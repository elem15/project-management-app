import { createAsyncThunk } from '@reduxjs/toolkit';
import { addLogin, addName, addUserId } from 'app/reducers/authSlice';
import { RootState } from 'app/store';
import { UserUp } from 'pages/SignUp/SignUp';
import { BASE_URL, USERS } from 'utils/const/urls';
import { getUsers } from './get-users';

export const updateUser = createAsyncThunk(
  'auth/updateUser',
  async (user: UserUp, { rejectWithValue, dispatch, getState }) => {
    const state = getState() as RootState;
    const { userId, token } = state.auth;
    const { name, login, password } = user;
    try {
      const response = await fetch(BASE_URL + USERS + userId, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
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
      localStorage.setItem('login', login);
      dispatch(addLogin(data.login));
      dispatch(addName(data.name));
      dispatch(addUserId(data._id));
      await dispatch(getUsers());
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
