import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { t } from 'i18next';
import { createBoard } from 'utils/API/create-board';
import { createColumn } from 'utils/API/create-column';
import { createTask } from 'utils/API/create-task';
import { deleteBoard } from 'utils/API/delete-board';
import { deleteBoardColumn } from 'utils/API/delete-board-column';
import { deleteColumnTask } from 'utils/API/delete-column-task';
import { deleteUser } from 'utils/API/delete-user';
import { getAllTasksByIds } from 'utils/API/get-all-tasks-by-ids';
import { getAllTasksByKeyword } from 'utils/API/get-all-tasks-by-keyword';
import { getBoardColumns } from 'utils/API/get-board-columns';
import { getBoards } from 'utils/API/get-boards';
import { getTasksByBoardId } from 'utils/API/get-tasks-by-board-id';
import { getTaskByColumn } from 'utils/API/get-tasks-by-column';
import { getTitleByBoardId } from 'utils/API/get-title-by-board-id';
import { getUsers } from 'utils/API/get-users';
import { signIn } from 'utils/API/sign-in';
import { signUp } from 'utils/API/sign-up';
import { updateBoardColumnTitle } from 'utils/API/update-board-column-title';
import { updateTask } from 'utils/API/update-task';
import { updateUser } from 'utils/API/update-user';
import { openNotificationWithIcon } from 'utils/Notification/Notification';

type User = {
  login: string;
  name: string;
  _id: string;
};

type Board = {
  _id: string;
  title: string;
  owner: string;
  users: string[];
};

export type Column = {
  _id: string;
  title: string;
  order: number;
  boardId: string;
  tasks: Task[];
};

export type Task = {
  _id: string;
  title: string;
  order: number;
  boardId: string;
  columnId: string;
  description: string;
  userId: string;
  users: string[];
};

type ErrorMessage = {
  statusCode: number;
  message: string;
  messageForAuth: string;
};

type BoardType = {
  isLoadingBoardsPage: boolean;
  isLoadingBoardPage: boolean;
  isLoading: boolean;
  isError: string;
  usersTeam: User[];
  boards: Board[];
  columns: Column[];
  teammates: string[];
  title: string;
  boardId: string;
  tasks: Task[];
};

const initialState: BoardType = {
  isLoadingBoardsPage: false,
  isLoadingBoardPage: false,
  isLoading: false,
  isError: '',
  usersTeam: [],
  boards: [],
  columns: [],
  teammates: [],
  title: '',
  boardId: '',
  tasks: [],
};

const dataHandler = (state: BoardType) => {
  state.isLoading = false;
  state.isError = initialState.isError;
};

const loaderHandler = (state: BoardType) => {
  state.isLoading = true;
  state.isError = initialState.isError;
};

const errorHandler = (state: BoardType, action: PayloadAction<ErrorMessage>) => {
  let descriptionError = t('message.unexpectedError');
  state.isLoading = false;
  state.isError = '';
  if (action.payload.statusCode === 400) {
    descriptionError = t('message.badRequest');
  }
  if (action.payload.statusCode === 401) {
    descriptionError = 'message.authorizationError';
  }
  if (action.payload.statusCode === 403) {
    descriptionError = t('message.invalidToken');
  }
  if (action.payload.statusCode === 404) {
    descriptionError = t('message.notFound');
  }
  if (action.payload.statusCode === 409) {
    descriptionError = t('message.loginExist');
  }
  openNotificationWithIcon('error', action.payload.message, descriptionError);
};

const addTasksToColumns = (columns: Column[], tasks: Task[]) => {
  tasks.map((task) => {
    columns.map((col) => {
      if (task.columnId === col._id) {
        col.tasks.push(task);
        col.tasks = col.tasks.sort((task1, task2) => task1.order - task2.order);
      }
    });
  });
};

export const boardSlice = createSlice({
  name: 'board',
  initialState,
  reducers: {
    swapColumns: (state, action: PayloadAction<Column[]>) => {
      state.columns = action.payload;
    },
    swapTasksInside: (state, action) => {
      const { startColumnId, startTasks } = action.payload;
      const startColumn = state.columns.find((col) => col._id === startColumnId) as Column;
      startColumn.tasks = startTasks;
    },
    swapTasksBetween: (state, action) => {
      const { startColumnId, startTasks, finishColumnId, finishTasks } = action.payload;
      const startColumn = state.columns.find((col) => col._id === startColumnId) as Column;
      const finishColumn = state.columns.find((col) => col._id === finishColumnId) as Column;
      startColumn.tasks = startTasks;
      finishColumn.tasks = finishTasks;
    },
    addBoards: (state, action: PayloadAction<Board[]>) => {
      state.boards = action.payload;
    },
    addBoardId: (state, action: PayloadAction<string>) => {
      state.boardId = action.payload;
    },
    deleteBoardById: (state, action: PayloadAction<string>) => {
      const newBoards = state.boards.filter((item) => item._id !== action.payload);
      state.boards = newBoards;
    },
    deleteTaskById: (state, action: PayloadAction<string>) => {
      const newTasks = state.tasks.filter((item) => item._id !== action.payload);
      state.tasks = newTasks;
    },
    addTasksToColumn: (state, action) => {
      const { columnId, tasks } = action.payload;
      const column = state.columns.find((column) => column._id === columnId);
      if (column) column.tasks = tasks;
    },
    updateTaskInColumn: (state, action) => {
      const { columnId, task } = action.payload;
      const column = state.columns.find((column) => column._id === columnId) as Column;
      const idx = column?.tasks.findIndex((t) => t._id === task._id) as number;
      column.tasks[idx] = task;
    },
    deleteTaskInColumn: (state, action) => {
      const { columnId, taskId } = action.payload;
      const column = state.columns.find((column) => column._id === columnId) as Column;
      column.tasks = column.tasks.filter((t) => t._id !== taskId);
    },
    updateColumn: (state, action) => {
      const column = action.payload;
      const idx = state.columns.findIndex((c) => c._id === column._id) as number;
      state.columns[idx] = { ...state.columns[idx], ...column };
    },
    removeColumnsState: (state) => {
      state.columns = [];
      state.tasks = [];
    },
    addColumns: (state, action: PayloadAction<Column[]>) => {
      state.columns = action.payload.sort((col1, col2) => col1.order - col2.order);
    },
    addTasks: (state, action: PayloadAction<Task[]>) => {
      state.tasks = action.payload;
      if (state.columns.length) {
        addTasksToColumns(state.columns, state.tasks);
        state.tasks = [];
      }
    },
  },
  extraReducers: {
    [createBoard.fulfilled.type]: (state, action: PayloadAction<Board>) => {
      state.boards = [...state.boards, action.payload];
      dataHandler(state);
      openNotificationWithIcon('success', t('message.createBoardSuccess'));
    },
    [createBoard.pending.type]: loaderHandler,
    [createBoard.rejected.type]: errorHandler,
    [getUsers.fulfilled.type]: (state, action: PayloadAction<User[]>) => {
      state.usersTeam = action.payload;
      dataHandler(state);
    },
    [getUsers.pending.type]: loaderHandler,
    [getUsers.rejected.type]: errorHandler,
    [getBoards.fulfilled.type]: (state, action: PayloadAction<Board[]>) => {
      state.isLoadingBoardsPage = false;
      state.boards = action.payload;
      dataHandler(state);
    },
    [getBoards.pending.type]: (state) => {
      state.isLoadingBoardsPage = true;
      loaderHandler(state);
    },
    [getBoards.rejected.type]: (state, action: PayloadAction<ErrorMessage>) => {
      state.isLoadingBoardsPage = false;
      errorHandler(state, action);
    },
    [getBoardColumns.fulfilled.type]: (state) => {
      state.isLoadingBoardPage = false;
      state.isLoading = false;
      state.isError = '';
    },
    [getBoardColumns.pending.type]: (state) => {
      state.isLoadingBoardPage = true;
      loaderHandler(state);
    },
    [getBoardColumns.rejected.type]: (state, action: PayloadAction<ErrorMessage>) => {
      state.isLoadingBoardPage = false;
      errorHandler(state, action);
    },
    [getTitleByBoardId.fulfilled.type]: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.isError = '';
      state.title = action.payload;
    },
    [getTitleByBoardId.pending.type]: loaderHandler,
    [getTitleByBoardId.rejected.type]: errorHandler,
    [deleteBoardColumn.fulfilled.type]: (state, action: PayloadAction<Column>) => {
      const newStateColumnsAfterDelete = state.columns.filter(
        (item) => item._id !== action.payload._id
      );
      const newStateTasksAfterDelete = state.tasks.filter(
        (item) => item.columnId !== action.payload._id
      );
      state.isLoadingBoardPage = false;
      state.columns = newStateColumnsAfterDelete;
      state.tasks = newStateTasksAfterDelete;
      dataHandler(state);
      openNotificationWithIcon('success', t('message.deleteColumnSuccess'));
    },
    [deleteBoardColumn.pending.type]: (state) => {
      state.isLoadingBoardPage = true;
      loaderHandler(state);
    },
    [deleteBoardColumn.rejected.type]: (state, action: PayloadAction<ErrorMessage>) => {
      state.isLoadingBoardPage = false;
      errorHandler(state, action);
    },
    [deleteBoard.fulfilled.type]: (state, action: PayloadAction<Board>) => {
      const newStateBoardsAfterDelete = state.boards.filter(
        (item) => item._id !== action.payload._id
      );
      state.isLoadingBoardPage = false;
      state.boards = newStateBoardsAfterDelete;
      dataHandler(state);
      openNotificationWithIcon('success', t('message.deleteBoardSuccess'));
    },
    [deleteBoard.pending.type]: (state) => {
      state.isLoadingBoardsPage = true;
      loaderHandler(state);
    },
    [deleteBoard.rejected.type]: (state, action: PayloadAction<ErrorMessage>) => {
      state.isLoadingBoardsPage = false;
      errorHandler(state, action);
    },
    [createTask.fulfilled.type]: (state, action: PayloadAction<Task>) => {
      state.isLoading = false;
      state.isError = '';
      const task = action.payload;
      const column = state.columns.find((column) => column._id === task.columnId) as Column;
      column.tasks = [...column.tasks, task];
      openNotificationWithIcon('success', t('message.createTaskSuccess'));
    },
    [createTask.pending.type]: loaderHandler,
    [createTask.rejected.type]: errorHandler,
    [createColumn.fulfilled.type]: (state, action: PayloadAction<Column>) => {
      state.isLoadingBoardPage = false;
      state.isLoading = false;
      state.isError = '';
      const column = { ...action.payload, tasks: [] };
      state.columns = [...state.columns, column];
      openNotificationWithIcon('success', t('message.createColumnSuccess'));
    },
    [createColumn.pending.type]: loaderHandler,
    [createColumn.rejected.type]: errorHandler,
    [getTasksByBoardId.fulfilled.type]: (state) => {
      state.isLoading = false;
      state.isError = '';
    },
    [getTasksByBoardId.pending.type]: loaderHandler,
    [getTasksByBoardId.rejected.type]: errorHandler,
    [updateBoardColumnTitle.fulfilled.type]: (state, action: PayloadAction<boolean>) => {
      dataHandler(state);
      if (!action.payload) {
        openNotificationWithIcon('success', t('message.updateColumnTitleSuccess'));
      }
    },
    [updateBoardColumnTitle.pending.type]: loaderHandler,
    [updateBoardColumnTitle.rejected.type]: errorHandler,
    [deleteColumnTask.fulfilled.type]: (state, action: PayloadAction<Task>) => {
      const newStateTasksAfterDelete = state.tasks.filter(
        (item) => item._id !== action.payload._id
      );
      state.isLoadingBoardPage = false;
      state.tasks = newStateTasksAfterDelete;
      dataHandler(state);
      openNotificationWithIcon('success', t('message.deleteTaskSuccess'));
    },
    [deleteColumnTask.pending.type]: loaderHandler,
    [deleteColumnTask.rejected.type]: errorHandler,
    [getTaskByColumn.fulfilled.type]: dataHandler,
    [getTaskByColumn.pending.type]: loaderHandler,
    [getTaskByColumn.rejected.type]: errorHandler,
    [updateTask.fulfilled.type]: (
      state,
      action: PayloadAction<{ data: Task; isSwap: boolean }>
    ) => {
      const newStateTasksAfterUpdate = state.tasks.map(function (item) {
        return item._id == action.payload.data._id ? action.payload.data : item;
      });
      state.isLoading = false;
      state.isError = '';
      state.tasks = newStateTasksAfterUpdate;
      if (!action.payload.isSwap) {
        openNotificationWithIcon('success', t('message.updateTaskSuccess'));
      }
    },
    [updateTask.pending.type]: loaderHandler,
    [updateTask.rejected.type]: errorHandler,
    [deleteUser.fulfilled.type]: (state) => {
      dataHandler(state);
      openNotificationWithIcon('success', t('message.deleteUserSuccess'));
    },
    [deleteUser.pending.type]: loaderHandler,
    [deleteUser.rejected.type]: errorHandler,
    [getAllTasksByIds.fulfilled.type]: (state, action: PayloadAction<Task[]>) => {
      dataHandler(state);
      action.payload.length === 0
        ? openNotificationWithIcon('success', t('message.getAllTasksByIdsEmptySuccess'))
        : openNotificationWithIcon('success', t('message.getAllTasksByIdsSuccess'));
    },
    [getAllTasksByIds.pending.type]: loaderHandler,
    [getAllTasksByIds.rejected.type]: errorHandler,
    [getAllTasksByKeyword.fulfilled.type]: (state, action: PayloadAction<Task[]>) => {
      dataHandler(state);
      action.payload.length === 0
        ? openNotificationWithIcon('success', t('message.getAllTasksByKeywordEmptySuccess'))
        : openNotificationWithIcon('success', t('message.getAllTasksByKeywordSuccess'));
    },
    [getAllTasksByKeyword.pending.type]: loaderHandler,
    [getAllTasksByKeyword.rejected.type]: errorHandler,
    [signIn.fulfilled.type]: (state) => {
      dataHandler(state);
      openNotificationWithIcon('success', t('message.signInSuccess'));
    },
    [signIn.pending.type]: loaderHandler,
    [signIn.rejected.type]: errorHandler,
    [signUp.fulfilled.type]: (state) => {
      dataHandler(state);
      openNotificationWithIcon('success', t('message.signUpSuccess'));
    },
    [signUp.pending.type]: loaderHandler,
    [signUp.rejected.type]: errorHandler,
    [updateUser.fulfilled.type]: (state) => {
      dataHandler(state);
      openNotificationWithIcon('success', t('message.updateUserSuccess'));
    },
    [updateUser.pending.type]: loaderHandler,
    [updateUser.rejected.type]: errorHandler,
  },
});

export const {
  addBoards,
  addBoardId,
  deleteBoardById,
  deleteTaskById,
  swapColumns,
  swapTasksInside,
  swapTasksBetween,
  addTasksToColumn,
  removeColumnsState,
  addColumns,
  addTasks,
  updateTaskInColumn,
  deleteTaskInColumn,
  updateColumn,
} = boardSlice.actions;

export default boardSlice.reducer;
