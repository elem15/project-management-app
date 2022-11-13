import { useAppDispatch, useAppSelector } from 'app/hooks';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getBoards } from 'utils/API/get-boards';
import { ROUTES } from 'utils/const/routes';
import './BoardList.scss';

const BoardList = () => {
  const dispatch = useAppDispatch();
  const router = useNavigate();

  useEffect(() => {
    dispatch(getBoards());
  }, [dispatch]);

  const { boards, isLoadingBoardsPage } = useAppSelector((state) => state.board);

  const handleClickOpen = (_id: string) => {
    if (_id) {
      router(`${ROUTES.YOUR_BOARDS}/${_id}`);
    } else {
      router(`${ROUTES.HOME_PAGE}`);
    }
  };

  const boardList = boards.map((item) => (
    <div key={item._id} className="card-item" onClick={() => handleClickOpen(item._id)}>
      <h3>Board title:</h3>
      <div>{item.title}</div>
      <h3>Created by:</h3>
      <div>{item.owner}</div>
    </div>
  ));

  console.log(boards);

  return (
    <>
      <h2>Your Boards</h2>
      {isLoadingBoardsPage ? <h2>Loading...</h2> : <div className="list">{boardList}</div>}
    </>
  );
};

export default BoardList;
