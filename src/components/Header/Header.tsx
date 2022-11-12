import { Button } from 'antd';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { signOut } from 'app/reducers/authSlice';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ROUTES } from 'utils/const/routes';
import './Header.scss';

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
          <span>
            {login} &#160;
            <Button onClick={handleSignOut}>Sign Out</Button>
          </span>
        ) : (
          <Link to={ROUTES.SIGN_IN_PAGE} className="page-name">
            SignIn
          </Link>
        )}
      </div>
    </header>
  );
}

export default Header;
