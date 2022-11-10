import React from 'react';
import { Link } from 'react-router-dom';
import { routes } from 'utils/const/routes';
import './Header.scss';

function Header() {
  return (
    <header className="header-container">
      <div className="page-name-container">
        <Link to={routes.homePage} className="page-name">
          Home
        </Link>
        <Link to={routes.signUpPage} className="page-name">
          SignUp
        </Link>
        <Link to={routes.signInPage} className="page-name">
          SignIn
        </Link>
        <Link to={routes.notFoundPage} className="page-name">
          404
        </Link>
      </div>
    </header>
  );
}

export default Header;
