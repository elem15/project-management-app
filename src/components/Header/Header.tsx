import React from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from 'utils/const/routes';
import './Header.scss';

function Header() {
  return (
    <header className="header-container">
      <div className="page-name-container">
        <Link to={ROUTES.HOME_PAGE} className="page-name">
          Home
        </Link>
        <Link to={ROUTES.SIGN_UP_PAGE} className="page-name">
          SignUp
        </Link>
        <Link to={ROUTES.SIGN_IN_PAGE} className="page-name">
          SignIn
        </Link>
        <Link to={ROUTES.NOT_FOUND_PAGE} className="page-name">
          404
        </Link>
      </div>
    </header>
  );
}

export default Header;
