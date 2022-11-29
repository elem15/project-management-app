import { createAsyncThunk } from '@reduxjs/toolkit';
import { signOut } from 'app/reducers/authSlice';
import { RootState } from 'app/store';
import { t } from 'i18next';
import { BASE_URL, BOARDS } from 'utils/const/urls';
import { openNotificationWithIcon } from 'utils/Notification/Notification';

type Boards = {
  _id: string;
  title: string;
  owner: string;
  users: string[];
};

type BoardsError = {
  statusCode: number;
  message: string;
};

export const getBoards = createAsyncThunk(
  'board/getBoards',
  async (_, { rejectWithValue, dispatch, getState }) => {
    let statusCode;
    const state = getState() as RootState;

    try {
      const response: Response = await fetch(BASE_URL + BOARDS, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: state.auth.token,
        },
      });
      const data: Boards[] | BoardsError = await response.json();

      if (!response.ok) {
        dispatch(signOut());
        statusCode = (data as BoardsError).statusCode;
        throw new Error(
          `Error! Status: ${(data as BoardsError).statusCode}. Message: ${
            (data as BoardsError).message
          }`
        );
      }
      return data;
    } catch (error) {
      if (statusCode === 403) {
        openNotificationWithIcon(
          'error',
          t('message.getTasksByBoardIdError'),
          t('message.invalidToken')
        );
      } else {
        openNotificationWithIcon(
          'error',
          t('message.getBoardsError'),
          t('message.unexpectedError')
        );
      }
      return rejectWithValue((error as Error).message);
    }
  }
);
