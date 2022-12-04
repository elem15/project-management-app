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
import { JSONErrorHandler } from 'pages/Board/Board';
import { useTranslation } from 'react-i18next';
import { Preloader } from 'components/Preloader/Preloader';

const BoardList = () => {
  const dispatch = useAppDispatch();
  const router = useNavigate();
  const { boards, isLoading } = useAppSelector((state) => state.board);
  const { token } = useAppSelector((state) => state.auth);
  const { t } = useTranslation();

  useEffect(() => {
    !token && router(ROUTES.WELCOME_PAGE);
  }, [token, router]);

  useEffect(() => {
    token && dispatch(getBoards());
  }, [dispatch, token]);

  const handleClickOpen = async (_id: string) => {
    if (_id) {
      dispatch(addBoardId(_id));
      router(`${ROUTES.YOUR_BOARDS}/${_id}`);
    } else {
      router(`${ROUTES.HOME_PAGE}`);
    }
  };

  const boardList = boards.map(({ _id, title, owner }) => (
    <div key={_id}>
      <div className="card-item" onClick={() => handleClickOpen(_id)}>
        <div>
          <h3>{t('boards.title')}</h3>
          <div className="text-cut">{title ? JSONErrorHandler(title, 'title') : ''}</div>
          <h3>{t('boards.description')}</h3>
          <div className="text-cut text-cut-description">
            {title
              ? JSONErrorHandler(title, 'description')
                ? JSONErrorHandler(title, 'description')
                : '-'
              : '-'}
          </div>
          <h3>{t('boards.created')}</h3>
          <div>{owner}</div>
        </div>
        <div>
          <Button
            shape="circle"
            icon={<DeleteOutlined />}
            danger
            onClick={(e) =>
              showDeleteConfirm(e, dispatch, 'board', `${t('message.board')}`, _id, t)
            }
          ></Button>
        </div>
      </div>
    </div>
  ));

  return (
    <>
      {isLoading && <Preloader />}
      <h2 className="header">{t('boards.header')}</h2>
      <div className="list">{boardList}</div>
    </>
  );
};

export default BoardList;
