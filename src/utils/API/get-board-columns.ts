import { createAsyncThunk } from '@reduxjs/toolkit';
import { addColumns, Column, Task } from 'app/reducers/boardSlice';
import { RootState } from 'app/store';
import { t } from 'i18next';
import { BASE_URL, BOARDS, COLUMNS, TASKS_SET } from 'utils/const/urls';
import { openNotificationWithIcon } from 'utils/Notification/Notification';

type ColumnError = {
  statusCode: number;
  message: string;
};

type TaskError = {
  statusCode: number;
  message: string;
};

export const getBoardColumns = createAsyncThunk(
  'board/getBoardColumns',
  async (boardId: string, { rejectWithValue, getState, dispatch }) => {
    let statusCode;
    const state = getState() as RootState;
    let columns = [] as Column[];
    try {
      const response: Response = await fetch(BASE_URL + BOARDS + `${boardId}/` + COLUMNS, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: state.auth.token,
        },
      });
      const data: Column[] | ColumnError = await response.json();
      if (!response.ok) {
        statusCode = (data as ColumnError).statusCode;
        throw new Error(
          `Error! Status: ${(data as ColumnError).statusCode}. Message: ${
            (data as ColumnError).message
          }`
        );
      }
      columns = data as Column[];
      columns.map((col) => (col.tasks = []));
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
    try {
      const response: Response = await fetch(BASE_URL + TASKS_SET + `${boardId}/`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: state.auth.token,
        },
      });
      const data: Task[] | TaskError = await response.json();
      if (!response.ok) {
        throw new Error(
          `Error! Status: ${(data as TaskError).statusCode}. Message: ${
            (data as TaskError).message
          }`
        );
      }
      const tasks = data as Task[];
      tasks.map((task) => {
        columns.map((col) => {
          if (task.columnId === col._id) {
            col.tasks.push(task);
            col.tasks = col.tasks.sort((task1, task2) => task1.order - task2.order);
          }
        });
      });
      dispatch(addColumns(columns));
    } catch (error) {
      if (statusCode === 403) {
        openNotificationWithIcon(
          'error',
          t('message.getBoardColumnError'),
          t('message.invalidToken')
        );
      } else {
        openNotificationWithIcon(
          'error',
          t('message.getBoardColumnError'),
          t('message.unexpectedError')
        );
      }

      return rejectWithValue((error as Error).message);
    }
  }
);
