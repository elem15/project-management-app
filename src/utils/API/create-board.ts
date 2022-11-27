import { createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from 'app/store';
import { openNotificationWithIcon } from 'utils/Notification/Notification';
import { BOARDS, BASE_URL } from 'utils/const/urls';
import { t } from 'i18next';

type Board = {
  title: string;
  owner: string;
  users: string[];
};

export const createBoard = createAsyncThunk(
  'board/createBoard',
  async (board: Board, { rejectWithValue, getState }) => {
    const { title, owner, users } = board;
    const state = getState() as RootState;
    try {
      const response: Response = await fetch(BASE_URL + BOARDS, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: state.auth.token,
        },
        body: JSON.stringify({
          title,
          owner,
          users,
        }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(`Error! Status: ${data.statusCode}. Message: ${data.message}`);
      }
      openNotificationWithIcon('success', t('message.createBoardSuccess'));
      return data;
    } catch (error) {
      openNotificationWithIcon('error', t('message.createBoardError'), (error as Error).message);
      return rejectWithValue((error as Error).message);
    }
  }
);
