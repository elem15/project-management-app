import { createAsyncThunk } from '@reduxjs/toolkit';
import { addAllUsers, setUser, signOut } from 'app/reducers/authSlice';
import { RootState } from 'app/store';
import { t } from 'i18next';
import { BASE_URL, USERS } from 'utils/const/urls';
import { openNotificationWithIcon } from 'utils/Notification/Notification';

export const getUsers = createAsyncThunk(
  'auth/getUsers',
  async (_, { rejectWithValue, dispatch, getState }) => {
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
        throw new Error(`Error! Status: ${data.statusCode}. Message: ${data.message}`);
      }
      dispatch(addAllUsers(await data));
      dispatch(setUser(await data));
      return data;
    } catch (error) {
      if (error instanceof Error) {
        openNotificationWithIcon('error', t('message.getUsersError'), t('message.unexpectedError'));
        if (error.message.startsWith('Error!')) {
          return rejectWithValue(error.message);
        } else {
          return rejectWithValue('An unexpected error occurred');
        }
      }
    }
  }
);
