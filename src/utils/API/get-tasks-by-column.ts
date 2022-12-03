import { createAsyncThunk } from '@reduxjs/toolkit';
import { addTasksToColumn, Task } from 'app/reducers/boardSlice';
import { RootState } from 'app/store';
import { t } from 'i18next';
import { BASE_URL, BOARDS, COLUMNS, TASKS } from 'utils/const/urls';

type ColumnError = {
  statusCode: number;
  message: string;
};

export const getTaskByColumn = createAsyncThunk(
  'board/getTaskByColumn',
  async (columnId: string, { rejectWithValue, getState, dispatch }) => {
    let statusCode;
    const state = getState() as RootState;
    const { boardId } = state.board;
    try {
      const response: Response = await fetch(
        BASE_URL + BOARDS + `${boardId}/` + COLUMNS + `${columnId}/` + TASKS,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: state.auth.token,
          },
        }
      );
      const data: Task[] | ColumnError = await response.json();
      if (!response.ok) {
        statusCode = (data as ColumnError).statusCode;
        throw new Error(
          `Error! Status: ${(data as ColumnError).statusCode}. Message: ${
            (data as ColumnError).message
          }`
        );
      }
      const tasks = data as Task[];
      dispatch(addTasksToColumn({ columnId, tasks }));
    } catch (error) {
      return rejectWithValue({
        statusCode: statusCode,
        message: t('message.getTasksByColumnError'),
      });
    }
  }
);
