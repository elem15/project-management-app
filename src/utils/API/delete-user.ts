import { createAsyncThunk } from '@reduxjs/toolkit';
import { signOut } from 'app/reducers/authSlice';
import { RootState } from 'app/store';
import { t } from 'i18next';
import { BASE_URL, USERS } from 'utils/const/urls';
import { openNotificationWithIcon } from 'utils/Notification/Notification';

export const deleteUser = createAsyncThunk(
  'auth/deleteUser',
  async (_, { rejectWithValue, dispatch, getState }) => {
    const state = getState() as RootState;
    try {
      const { userId, token } = state.auth;
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
      openNotificationWithIcon('success', t('message.deleteUserSuccess'));
    } catch (error) {
      if (error instanceof Error) {
        if (error.message.startsWith('Error!')) {
          openNotificationWithIcon('error', t('message.deleteUserError'), (error as Error).message);
          return rejectWithValue(error.message);
        } else {
          openNotificationWithIcon('error', t('message.deleteUserError'), (error as Error).message);
          return rejectWithValue('An unexpected error occurred');
        }
      }
    }
  }
);
