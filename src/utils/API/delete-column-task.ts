import { createAsyncThunk } from '@reduxjs/toolkit';
import { deleteTaskInColumn } from 'app/reducers/boardSlice';
import { RootState } from 'app/store';
import { t } from 'i18next';
import { BASE_URL, BOARDS, COLUMNS, TASKS } from 'utils/const/urls';

type Task = {
  taskId: string;
  columnId: string;
  boardId: string;
};

type TaskError = {
  statusCode: string;
  message: string;
};

export const deleteColumnTask = createAsyncThunk(
  'board/deleteColumnTask',
  async (task: Task, { rejectWithValue, getState, dispatch }) => {
    let statusCode;
    const { taskId, columnId, boardId } = task;
    const state = getState() as RootState;
    try {
      const response: Response = await fetch(
        BASE_URL + BOARDS + `${boardId}/` + COLUMNS + `${columnId}/` + TASKS + `${taskId}/`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            Authorization: state.auth.token,
          },
        }
      );
      const data = await response.json();
      if (!response.ok) {
        statusCode = (data as TaskError).statusCode;
        throw new Error(
          `Error! Status: ${(data as TaskError).statusCode}. Message: ${
            (data as TaskError).message
          }`
        );
      }
      dispatch(deleteTaskInColumn({ columnId, taskId }));
    } catch (error) {
      return rejectWithValue({ statusCode: statusCode, message: t('message.deleteTaskError') });
    }
  }
);
