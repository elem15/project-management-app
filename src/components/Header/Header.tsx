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
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faSignOut } from '@fortawesome/free-solid-svg-icons';
import { Dropdown } from 'antd';
import type { MenuProps } from 'antd';

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

  const items: MenuProps['items'] = [
    {
      label: (
        <Link to={ROUTES.PROFILE} className="nav__link" style={{ marginLeft: '15px' }}>
          Edit profile
        </Link>
      ),
      key: '1',
      icon: <FontAwesomeIcon icon={faUser} />,
    },
    {
      label: <span onClick={handleSignOut}>Sign out</span>,
      key: '2',
      icon: <FontAwesomeIcon icon={faSignOut} />,
    },
  ];

  const menuProps = {
    items,
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
          <ul className="nav">
            <Link to={ROUTES.TEMPORARY_BOARD} className="nav__link">
              {t('header.board')}
            </Link>
            <Link to={ROUTES.YOUR_BOARDS} className="nav__link">
              {t('header.boardList')}
            </Link>
            <AddModalCreateBoard
              typeButton={'primary'}
              titleTextButton={t('header.newBoard')}
              titleTextModal={'Create Board'}
              titleForm={'Board title'}
              objField={'boardTitle'}
            />
            <Dropdown.Button
              menu={menuProps}
              placement="bottom"
              icon={<FontAwesomeIcon icon={faUser} />}
            >
              {name}
            </Dropdown.Button>
          </ul>
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
