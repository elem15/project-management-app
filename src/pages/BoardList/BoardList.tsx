import { useAppDispatch, useAppSelector } from 'app/hooks';
import { addBoards } from 'app/reducers/boardSlice';
import React, { useEffect } from 'react';
import { getBoards } from 'utils/API/get-boards';
import keyCreator from 'utils/keyCreator/keyCreator';

type Boards = {
  _id: string;
  title: string;
  owner: string;
  users: string[];
};

const BoardList = () => {
  // const dispatch = useAppDispatch();
  // await dispatch(getUsersBoard());
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getBoards());
  }, [dispatch]);

  const { boards, isLoadingBoardsPage } = useAppSelector((state) => state.board);
  const boa = boards.map((item) => <div key={keyCreator()}>{item.owner}</div>);
  console.log(boards);
  return (
    <>
      <h2>Your Boards</h2>
      <h2>Your Boards</h2>
      {isLoadingBoardsPage ? <h2>Loading...</h2> : <div>{boa}</div>}
    </>
  );
};

export default BoardList;
