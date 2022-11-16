import { Card, Space, Spin } from 'antd';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { Preloader } from 'components/Preloader/Preloader';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getBoardColumns } from 'utils/API/get-board-columns';
import { getBoards } from 'utils/API/get-boards';
import { quantityTeammates } from 'utils/const/other';
import { ROUTES } from 'utils/const/routes';
import keyCreator from 'utils/keyCreator/keyCreator';
import './BoardList.scss';

const BoardList = () => {
  const dispatch = useAppDispatch();
  const router = useNavigate();

  useEffect(() => {
    dispatch(getBoards());
  }, [dispatch]);

  const { boards, isLoadingBoardsPage } = useAppSelector((state) => state.board);

  const handleClickOpen = async (_id: string) => {
    if (_id) {
      await dispatch(getBoardColumns(_id));
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

  const boardList = boards.map((item) => (
    <Card
      key={item._id}
      onClick={() => handleClickOpen(item._id)}
      title={`Board title: ${item.title}`}
      className="boards__item"
      bordered
    >
      <h3>Created by: {item.owner}</h3>
      {item.users.length && (
        <>
          <h3>Teammates:</h3>
          <div>{createTeammatesList(item.users)}</div>
        </>
      )}
    </Card>
  ));

  return (
    <>
      <h2
        style={{
          padding: '1rem',
        }}
      >
        Your Boards
      </h2>
      <div className="boards">{isLoadingBoardsPage ? <Preloader /> : boardList}</div>
    </>
  );
};

export default BoardList;
