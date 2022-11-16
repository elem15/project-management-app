import { useAppDispatch, useAppSelector } from 'app/hooks';
import { signOut } from 'app/reducers/authSlice';
import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ROUTES } from 'utils/const/routes';
import './Header.scss';
import { AddModalCreateBoard } from 'components/ModalCreateBoard/ModalCreateBoard.Window';
import logout from '../../media/logout.png';

type StickyType = {
  sticky: boolean;
  offset: number;
};

function Header() {
  const { name, token } = useAppSelector((state) => state.auth);
  const headerRef = useRef(null);
  const [sticky, setSticky] = useState<StickyType>({ sticky: false, offset: 0 });
  const appDispatch = useAppDispatch();
  const navigate = useNavigate();
  const handleSignOut = async () => {
    appDispatch(signOut());
    navigate(ROUTES.HOME_PAGE);
  };

  const handleScroll = (elTopOffset: number, elHeight: number) => {
    if (window.pageYOffset > elTopOffset + elHeight) {
      setSticky({ sticky: true, offset: elHeight });
    } else {
      setSticky({ sticky: false, offset: 0 });
    }
  };

  useEffect(() => {
    if (headerRef.current) {
      const header = (headerRef.current as HTMLElement).getBoundingClientRect();
      const handleScrollEvent = () => {
        handleScroll(header.top, header.height);
      };

      window.addEventListener('scroll', handleScrollEvent);

      return () => {
        window.removeEventListener('scroll', handleScrollEvent);
      };
    }
  }, []);

  return (
    <header
      className={sticky.sticky ? 'header-container sticky' : 'header-container'}
      ref={headerRef}
    >
      <div className="page-name-container">
        <Link to={ROUTES.HOME_PAGE} className="page-name">
          Home
        </Link>
        {token ? (
          <div>
            <Link to={ROUTES.HOME_PAGE} className="nav__link">
              Go to Main Page
            </Link>
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
            <Link to={ROUTES.PROFILE} className="page-name" style={{ marginLeft: '15px' }}>
              <div className="icon" /> {name}
            </Link>
            <img className="logout" onClick={handleSignOut} src={logout} alt="logout" />
          </div>
        ) : (
          <ul className="nav">
            <Link to={ROUTES.SIGN_IN_PAGE} className="nav__link">
              Sign In
            </Link>
            <Link to={ROUTES.SIGN_UP_PAGE} className="nav__link">
              Sign Up
            </Link>
          </ul>
        )}
      </div>
    </header>
  );
}

export default Header;
