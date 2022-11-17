import { Button } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { addBoardId, deleteBoardById } from 'app/reducers/boardSlice';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getBoards } from 'utils/API/get-boards';
import { quantityTeammates } from 'utils/const/other';
import { ROUTES } from 'utils/const/routes';
import keyCreator from 'utils/keyCreator/keyCreator';
import './BoardList.scss';
import { deleteBoard } from 'utils/API/delete-board';

const BoardList = () => {
  const dispatch = useAppDispatch();
  const router = useNavigate();

  useEffect(() => {
    dispatch(getBoards());
  }, [dispatch]);

  const { boards, isLoadingBoardsPage } = useAppSelector((state) => state.board);

  const handleClickOpen = async (_id: string) => {
    if (_id) {
      dispatch(addBoardId(_id));
      router(`${ROUTES.YOUR_BOARDS}/${_id}`);
    } else {
      router(`${ROUTES.HOME_PAGE}`);
    }
  };

  const createTeammatesList = (users: string[]) => {
    if (users.length > quantityTeammates) {
      const partUsers = users
        .slice(0, quantityTeammates)
        .map((item: string) => <div key={keyCreator()}>{item}</div>);
      return (
        <>
          <div>{partUsers}</div>
          <div>and other</div>
        </>
      );
    } else {
      const allUsers = users.map((item: string) => <div key={keyCreator()}>{item}</div>);
      return (
        <>
          <div>{allUsers}</div>
        </>
      );
    }
  };

  const handleClickDeleteBoard = async (boardId: string) => {
    await dispatch(deleteBoard(boardId));
    dispatch(deleteBoardById(boardId));
  };

  const boardList = boards.map((item) => (
    <div key={item._id} className="card-item">
      <div onClick={() => handleClickOpen(item._id)}>
        <h3>Board title:</h3>
        <div>{item.title}</div>
        <h3>Created by:</h3>
        <div>{item.owner}</div>
        {item.users.length !== 0 && (
          <>
            <h3>Teammates:</h3>
            <div>{createTeammatesList(item.users)}</div>
          </>
        )}
      </div>
      <Button
        shape="circle"
        icon={<DeleteOutlined />}
        danger
        onClick={() => handleClickDeleteBoard(item._id)}
      ></Button>
    </div>
  ));

  return (
    <>
      <h2>Your Boards</h2>
      {isLoadingBoardsPage ? <h2>Loading...</h2> : <div className="list">{boardList}</div>}
    </>
  );
};

export default BoardList;
