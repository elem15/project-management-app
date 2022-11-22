import { Button } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { addBoardId } from 'app/reducers/boardSlice';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getBoards } from 'utils/API/get-boards';
import { ROUTES } from 'utils/const/routes';
import './BoardList.scss';
import { showDeleteConfirm } from 'components/ModalConfirm/ModalConfirm';

const BoardList = () => {
  const dispatch = useAppDispatch();
  const router = useNavigate();
  const { boards } = useAppSelector((state) => state.board);
  const { token } = useAppSelector((state) => state.auth);

  useEffect(() => {
    !token && router(ROUTES.WELCOME_PAGE);
  }, [token, router]);

  useEffect(() => {
    dispatch(getBoards());
  }, [dispatch]);

  const handleClickOpen = async (_id: string) => {
    if (_id) {
      dispatch(addBoardId(_id));
      router(`${ROUTES.YOUR_BOARDS}/${_id}`);
    } else {
      router(`${ROUTES.HOME_PAGE}`);
    }
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
            onClick={(e) => showDeleteConfirm(e, dispatch, 'board', item._id)}
          ></Button>
        </div>
      </div>
    </div>
  ));

  return (
    <>
      <h2 className="header">Your Boards</h2>
      <div className="list">{boardList}</div>
    </>
  );
};

export default BoardList;
