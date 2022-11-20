import { useAppDispatch, useAppSelector } from 'app/hooks';
import { signOut } from 'app/reducers/authSlice';
import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ROUTES } from 'utils/const/routes';
import './Header.scss';
import { AddModalCreateBoard } from 'components/ModalCreateBoard/ModalCreateBoard.Window';
import logout from '../../media/logout.png';
import Localize from 'components/Localize/Localize';
import { useTranslation } from 'react-i18next';

type StickyType = {
  sticky: boolean;
  offset: number;
};

function Header() {
  const { t } = useTranslation();

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
        <Link to={ROUTES.HOME_PAGE} className="nav__link">
          {t('header.main')}
        </Link>
        {token ? (
          <div>
            <Link to={ROUTES.TEMPORARY_BOARD} className="page-name">
              {t('header.board')}
            </Link>
            <Link to={ROUTES.YOUR_BOARDS} className="page-name">
              {t('header.boardList')}
            </Link>
            <AddModalCreateBoard
              typeButton={'primary'}
              titleTextButton={t('header.newBoard')}
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
              {t('header.signIn')}
            </Link>
            <Link to={ROUTES.SIGN_UP_PAGE} className="nav__link">
              {t('header.signUp')}
            </Link>
          </ul>
        )}
        <Localize />
      </div>
    </header>
  );
}

export default Header;
