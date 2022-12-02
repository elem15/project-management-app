import { createAsyncThunk } from '@reduxjs/toolkit';
import { addAllUsers, setUser, signOut } from 'app/reducers/authSlice';
import { RootState } from 'app/store';
import { t } from 'i18next';
import { BASE_URL, USERS } from 'utils/const/urls';

export const getUsers = createAsyncThunk(
  'auth/getUsers',
  async (_, { rejectWithValue, dispatch, getState }) => {
    let statusCode;
    const state = getState() as RootState;

    try {
      const response: Response = await fetch(BASE_URL + USERS, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: state.auth.token,
        },
      });
      const data = await response.json();
      if (!response.ok) {
        dispatch(signOut());
        statusCode = data.statusCode;
        throw new Error(`Error! Status: ${data.statusCode}. Message: ${data.message}`);
      }
      dispatch(addAllUsers(await data));
      dispatch(setUser(await data));
      return data;
    } catch (error) {
      if (error instanceof Error) {
        if (error.message.startsWith('Error!')) {
          return rejectWithValue({
            statusCode: statusCode,
            message: t('message.getUsersError'),
            messageForAuth: error.message,
          });
        } else {
          return rejectWithValue({
            statusCode: statusCode,
            message: t('message.getUsersError'),
            messageForAuth: 'An unexpected error occurred',
          });
        }
      }
    }
  }
);
