import { Button } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { addBoardId, deleteBoardById } from 'app/reducers/boardSlice';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getBoards } from 'utils/API/get-boards';
import { ROUTES } from 'utils/const/routes';
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

  const handleClickDeleteBoard = async (boardId: string) => {
    await dispatch(deleteBoard(boardId));
    dispatch(deleteBoardById(boardId));
  };

  const boardList = boards.map((item) => (
    <div key={item._id} className="card-item">
      <div onClick={() => handleClickOpen(item._id)}>
        <h3>Board title:</h3>
        <div>{JSON.parse(item.title).title}</div>
        <h3>Board description:</h3>
        <div>{JSON.parse(item.title).description}</div>
        <h3>Created by:</h3>
        <div>{item.owner}</div>
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
