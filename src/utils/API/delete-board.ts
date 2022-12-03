import { createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from 'app/store';
import { t } from 'i18next';
import { BASE_URL, BOARDS } from 'utils/const/urls';

type BoardError = {
  statusCode: string;
  message: string;
};

export const deleteBoard = createAsyncThunk(
  'board/deleteBoard',
  async (boardId: string, { rejectWithValue, getState }) => {
    let statusCode;
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
        statusCode = (data as BoardError).statusCode;
        throw new Error(
          `Error! Status: ${(data as BoardError).statusCode}. Message: ${
            (data as BoardError).message
          }`
        );
      }
      return data;
    } catch (error) {
      return rejectWithValue({ statusCode: statusCode, message: t('message.deleteBoardError') });
    }
  }
);
