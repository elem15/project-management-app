import { Modal } from 'antd';
import { ExclamationCircleFilled } from '@ant-design/icons';
import React from 'react';
import { deleteBoard } from 'utils/API/delete-board';
import { AnyAction, Dispatch, ThunkDispatch } from '@reduxjs/toolkit';
import { deleteBoardColumn } from 'utils/API/delete-board-column';
import { deleteColumnTask } from 'utils/API/delete-column-task';
import { TFunction } from 'i18next';
import { deleteUser } from 'utils/API/delete-user';
import { deleteBoardById, deleteTaskById } from 'app/reducers/boardSlice';

const { confirm } = Modal;

export interface User {
  name: string;
  login: string;
  _id: string;
}

type Board = {
  _id: string;
  title: string;
  owner: string;
  users: string[];
};

type Column = {
  _id: string;
  title: string;
  order: number;
  boardId: string;
};

type Task = {
  _id: string;
  title: string;
  order: number;
  boardId: string;
  columnId: string;
  description: string;
  userId: string;
  users: string[];
};

export interface IAuthState {
  name: string;
  login: string;
  password: string;
  token: string;
  status: string;
  errorMessage: string;
  userId: string;
  users: User[];
}

type BoardType = {
  isLoadingBoardsPage: boolean;
  isLoadingBoardPage: boolean;
  isLoading: boolean;
  isError: string;
  usersTeam: User[];
  boards: Board[];
  columns: Column[];
  teammates: string[];
  boardId: string;
  tasks: Task[];
};

export const showDeleteConfirm = (
  e: React.MouseEvent<HTMLElement, globalThis.MouseEvent>,
  dispatch: ThunkDispatch<{ auth: IAuthState; board: BoardType }, undefined, AnyAction> &
    Dispatch<AnyAction>,
  item: string,
  nameItem: string,
  boardId: string,
  t: TFunction<'translation', undefined>,
  columnId = '',
  taskId = ''
) => {
  e.stopPropagation();
  confirm({
    title: `${t('message.deleteConfirm')} ${nameItem}?`,
    icon: <ExclamationCircleFilled />,
    okText: `${t('sign.ok')}`,
    okType: 'danger',
    cancelText: `${t('sign.cancel')}`,
    async onOk() {
      switch (item) {
        case 'board': {
          await dispatch(deleteBoard(boardId));
          dispatch(deleteBoardById(boardId));
          break;
        }
        case 'column': {
          await dispatch(deleteBoardColumn({ columnId: columnId, boardId: boardId }));
          break;
        }
        case 'task': {
          await dispatch(
            deleteColumnTask({ taskId: taskId, columnId: columnId, boardId: boardId })
          );
          dispatch(deleteTaskById(taskId));
          break;
        }
        case 'user': {
          dispatch(deleteUser());
        }
      }
    },
  });
};
