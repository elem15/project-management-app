import { Button } from 'antd';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { signOut } from 'app/reducers/authSlice';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ROUTES } from 'utils/const/routes';
import './Header.scss';
import { AddModalCreateBoard } from 'components/ModalCreateBoard/ModalCreateBoard.Window';

function Header() {
  const { login, token } = useAppSelector((state) => state.auth);
  const appDispatch = useAppDispatch();
  const navigate = useNavigate();
  const handleSignOut = async () => {
    appDispatch(signOut());
    navigate(ROUTES.HOME_PAGE);
  };
  return (
    <header className="header-container">
      <div className="page-name-container">
        <Link to={ROUTES.HOME_PAGE} className="page-name">
          Home
        </Link>
        {token ? (
          <div>
            <Link to={ROUTES.HOME_PAGE} className="page-name">
              Go to Main Page &#160;
            </Link>
            {login} &#160;
            <Link to={ROUTES.TEMPORARY_BOARD} className="page-name">
              Board
            </Link>
            <Link to={ROUTES.YOUR_BOARDS} className="page-name">
              BoardList
            </Link>
            <AddModalCreateBoard
              typeButton={'primary'}
              titleTextButton={'New board'}
              titleTextModal={'Create Board'}
              titleForm={'Board title'}
              objField={'boardTitle'}
            />
            <Button onClick={handleSignOut}>Sign Out</Button>
          </div>
        ) : (
          <div>
            <Link to={ROUTES.SIGN_IN_PAGE} className="page-name">
              Sign In
            </Link>
            &#160;&#160;&#160;
            <Link to={ROUTES.SIGN_UP_PAGE} className="page-name">
              Sign Up
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
