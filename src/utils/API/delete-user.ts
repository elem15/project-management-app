import { createAsyncThunk } from '@reduxjs/toolkit';
import { signOut } from 'app/reducers/authSlice';
import { RootState } from 'app/store';
import { t } from 'i18next';
import { BASE_URL, USERS } from 'utils/const/urls';

export const deleteUser = createAsyncThunk(
  'auth/deleteUser',
  async (_, { rejectWithValue, dispatch, getState }) => {
    let statusCode;
    const state = getState() as RootState;
    try {
      const { userId, token } = state.auth;
      const response: Response = await fetch(BASE_URL + USERS + userId, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
      });
      const data = await response.json();
      if (!response.ok) {
        statusCode = data.statusCode;
        throw new Error(`Error! Status: ${data.statusCode}. Message: ${data.message}`);
      }
      localStorage.clear();
      dispatch(signOut());
    } catch (error) {
      if (error instanceof Error) {
        if (error.message.startsWith('Error!')) {
          return rejectWithValue({
            statusCode: statusCode,
            message: t('message.deleteUserError'),
            messageForAuth: error.message,
          });
        } else {
          return rejectWithValue({
            statusCode: statusCode,
            message: t('message.deleteUserError'),
            messageForAuth: 'An unexpected error occurred',
          });
        }
      }
    }
  }
);
