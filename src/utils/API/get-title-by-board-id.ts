import { createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from 'app/store';
import { t } from 'i18next';
import { BASE_URL, BOARDS } from 'utils/const/urls';

type Board = {
  _id: string;
  title: string;
  owner: string;
  users: string[];
};

type BoardError = {
  statusCode: number;
  message: string;
};

export const getTitleByBoardId = createAsyncThunk(
  'board/getTitleByBoardId',
  async (boardId: string, { rejectWithValue, getState }) => {
    let statusCode;
    const state = getState() as RootState;

    try {
      const response: Response = await fetch(BASE_URL + BOARDS + `${boardId}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: state.auth.token,
        },
      });
      const data: Board | BoardError = await response.json();
      if (!response.ok) {
        statusCode = (data as BoardError).statusCode;
        throw new Error(
          `Error! Status: ${(data as BoardError).statusCode}. Message: ${
            (data as BoardError).message
          }`
        );
      }
      return (data as Board).title;
    } catch (error) {
      return rejectWithValue({
        statusCode: statusCode,
        message: t('message.getTitleByBoardIdError'),
      });
    }
  }
);
