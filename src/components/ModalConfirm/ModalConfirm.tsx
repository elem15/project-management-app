import { Modal } from 'antd';
import { ExclamationCircleFilled } from '@ant-design/icons';
import React from 'react';
import { deleteBoard } from 'utils/API/delete-board';
import { AnyAction, Dispatch, ThunkDispatch } from '@reduxjs/toolkit';
import { deleteBoardColumn } from 'utils/API/delete-board-column';
import { deleteColumnTask } from 'utils/API/delete-column-task';

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
  nameItem: string,
  boardId: string,
  columnId = '',
  taskId = ''
) => {
  e.stopPropagation();
  confirm({
    title: `Are you sure delete this ${nameItem}?`,
    icon: <ExclamationCircleFilled />,
    okText: 'Yes',
    okType: 'danger',
    cancelText: 'No',
    async onOk() {
      if (nameItem === 'board') {
        await dispatch(deleteBoard(boardId));
      }
      if (nameItem === 'column') {
        await dispatch(deleteBoardColumn({ columnId: columnId, boardId: boardId }));
      }
      if (nameItem === 'task') {
        await dispatch(deleteColumnTask({ taskId: taskId, columnId: columnId, boardId: boardId }));
      }
    },
  });
};
