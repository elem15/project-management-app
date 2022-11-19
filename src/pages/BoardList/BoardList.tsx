import { Button } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { addBoardId, deleteBoardById } from 'app/reducers/boardSlice';
import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { getBoards } from 'utils/API/get-boards';
import { ROUTES } from 'utils/const/routes';
import './BoardList.scss';
import { deleteBoard } from 'utils/API/delete-board';

const BoardList = () => {
  const dispatch = useAppDispatch();
  const router = useNavigate();
  const location = useLocation();

  useEffect(() => {
    dispatch(getBoards());
  }, [dispatch, location]);

  const { boards, isLoadingBoardsPage } = useAppSelector((state) => state.board);

  const handleClickOpen = async (_id: string) => {
    if (_id) {
      dispatch(addBoardId(_id));
      router(`${ROUTES.YOUR_BOARDS}/${_id}`);
    } else {
      router(`${ROUTES.HOME_PAGE}`);
    }
  };

  const handleClickDeleteBoard = async (
    e: React.MouseEvent<HTMLElement, globalThis.MouseEvent>,
    boardId: string
  ) => {
    e.stopPropagation();
    await dispatch(deleteBoard(boardId));
    dispatch(deleteBoardById(boardId));
  };

  const boardList = boards.map((item) => (
    <div key={item._id}>
      <div className="card-item" onClick={() => handleClickOpen(item._id)}>
        <div>
          <h3>Board title:</h3>
          <div className="text-cut">{JSON.parse(item.title).title}</div>
          <h3>Board description:</h3>
          <div className="text-cut">
            {JSON.parse(item.title).description ? JSON.parse(item.title).description : '-'}
          </div>
          <h3>Created by:</h3>
          <div>{item.owner}</div>
        </div>
        <div>
          <Button
            shape="circle"
            icon={<DeleteOutlined />}
            danger
            onClick={(e) => handleClickDeleteBoard(e, item._id)}
          ></Button>
        </div>
      </div>
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
