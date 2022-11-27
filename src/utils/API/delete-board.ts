import { createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from 'app/store';
import { t } from 'i18next';
import { BASE_URL, BOARDS } from 'utils/const/urls';
import { openNotificationWithIcon } from 'utils/Notification/Notification';

type BoardError = {
  statusCode: string;
  message: string;
};

export const deleteBoard = createAsyncThunk(
  'board/deleteBoard',
  async (boardId: string, { rejectWithValue, getState }) => {
    const state = getState() as RootState;
    try {
      const response: Response = await fetch(BASE_URL + BOARDS + `${boardId}/`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: state.auth.token,
        },
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(
          `Error! Status: ${(data as BoardError).statusCode}. Message: ${
            (data as BoardError).message
          }`
        );
      }
      openNotificationWithIcon('success', t('message.deleteBoardSuccess'));
      return data;
    } catch (error) {
      openNotificationWithIcon('error', t('message.deleteBoardError'), (error as Error).message);
      return rejectWithValue((error as Error).message);
    }
  }
);
