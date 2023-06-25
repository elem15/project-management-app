import { createAsyncThunk } from '@reduxjs/toolkit';
import { updateTaskInColumn } from 'app/reducers/boardSlice';
import { RootState } from 'app/store';
import { t } from 'i18next';
import { BASE_URL, BOARDS, COLUMNS, TASKS } from 'utils/const/urls';

type Task = {
  title: string;
  order: number;
  description: string;
  boardId: string;
  columnId: string;
  taskId: string;
  userId: string;
  users: string[];
  isSwap: boolean;
};

type TaskError = {
  statusCode: number;
  message: string;
};

export const updateTask = createAsyncThunk(
  'board/updateTask',
  async (task: Task, { rejectWithValue, getState, dispatch }) => {
    let statusCode;
    const { title, order, description, boardId, columnId, taskId, userId, users, isSwap } = task;
    const state = getState() as RootState;
    try {
      const response: Response = await fetch(
        BASE_URL + BOARDS + `${boardId}/` + COLUMNS + `${columnId}/` + TASKS + `${taskId}/`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: state.auth.token,
          },
          body: JSON.stringify({
            title,
            order,
            description,
            columnId,
            userId,
            users,
          }),
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
      const task = data as Task;
      dispatch(updateTaskInColumn({ columnId, task }));
      return { data: data, isSwap: isSwap };
    } catch (error) {
      return rejectWithValue({
        statusCode: statusCode,
        message: t('message.updateTaskError'),
      });
    }
  }
);
