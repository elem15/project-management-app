import { createAsyncThunk } from '@reduxjs/toolkit';
import { deleteTaskInColumn } from 'app/reducers/boardSlice';
import { RootState } from 'app/store';
import { t } from 'i18next';
import { BASE_URL, BOARDS, COLUMNS, TASKS } from 'utils/const/urls';
import { openNotificationWithIcon } from 'utils/Notification/Notification';

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
        throw new Error(
          `Error! Status: ${(data as TaskError).statusCode}. Message: ${
            (data as TaskError).message
          }`
        );
      }
      dispatch(deleteTaskInColumn({ columnId, taskId }));
      openNotificationWithIcon('success', t('message.deleteTaskSuccess'));
    } catch (error) {
      openNotificationWithIcon('error', t('message.deleteTaskError'), t('message.unexpectedError'));
      return rejectWithValue((error as Error).message);
    }
  }
);
