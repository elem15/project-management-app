import { useAppDispatch, useAppSelector } from 'app/hooks';
import { addBoards } from 'app/reducers/boardSlice';
import React, { useEffect } from 'react';
import { getBoards } from 'utils/API/get-boards';

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

  const fetchData = async () => {
    await dispatch(getBoards());
  };

  useEffect(() => {
    (async () => {
      await dispatch(getBoards())
        .then((res) => res as Boards[])
        .then((res) => dispatch(addBoards(res)));
    })();
  }, [dispatch]);

  const { boards } = useAppSelector((state) => state.board);
  console.log(boards);
  return (
    <>
      <h2>Your Boards</h2>
      <h2>Your Boards</h2>
    </>
  );
};

export default BoardList;
