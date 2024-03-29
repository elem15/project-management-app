import { useAppDispatch, useAppSelector } from 'app/hooks';
import { signOut } from 'app/reducers/authSlice';
import Localize from 'components/Localize/Localize';
import { AddModalCreateBoard } from 'components/ModalCreateBoard/ModalCreateBoard.Window';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import { ROUTES } from 'utils/const/routes';
import logout from '../../media/log-out.png';
import user from '../../media/user.svg';
import boards from '../../media/boards.svg';
import burger from '../../media/burger.svg';
import signIn from '../../media/sign-in.svg';
import signUp from '../../media/sign-up.png';
import search from '../../media/search.svg';
import './Burger.scss';
const lingRevert = {
  en: 'ru',
  ru: 'en',
};
const Burger = () => {
  const [isMenu, setIsMenu] = useState(false);
  const { t } = useTranslation();
  const { i18n } = useTranslation();
  const lingChange = () => {
    const ling = i18n.resolvedLanguage as keyof typeof lingRevert;
    i18n.changeLanguage(lingRevert[ling]);
  };
  const { token } = useAppSelector((state) => state.auth);
  const appDispatch = useAppDispatch();
  const navigate = useNavigate();
  const handleSignOut = () => {
    appDispatch(signOut());
    navigate(ROUTES.HOME_PAGE);
  };
  return (
    <div className="burger">
      <div className="burger-btn">
        <img src={burger} onClick={() => setIsMenu(!isMenu)} />
      </div>
      {isMenu && <div className="burger-down-layer" onClick={() => setIsMenu(!isMenu)} />}
      <div className={isMenu ? 'burger-no-view' : 'burger-view'}>
        {token ? (
          <ul className="burger-menu">
            <li className="menu-item">
              <Link to={ROUTES.SEARCH} onClick={() => setIsMenu(!isMenu)} className="page-name">
                <img className="icon" src={search} alt="search" />
                <span className="menu-item-title">{t('header.search')}</span>
              </Link>
            </li>
            <li className="menu-item">
              <Link
                to={ROUTES.YOUR_BOARDS}
                onClick={() => setIsMenu(!isMenu)}
                className="page-name"
              >
                <img className="icon" src={boards} alt="boards list" />
                <span className="menu-item-title">{t('header.boardList')}</span>
              </Link>
            </li>
            <li className="menu-item">
              <AddModalCreateBoard
                setIsMenu={setIsMenu}
                isMenu={isMenu}
                typeButton={'primary'}
                titleTextButton={t('header.newBoard')}
                titleTextModal={'Create Board'}
                titleForm={'Board title'}
                objField={'boardTitle'}
              />
            </li>
            <li className="menu-item">
              <Link to={ROUTES.PROFILE} onClick={() => setIsMenu(!isMenu)} className="page-name">
                <img className="icon" src={user} alt="user profile" />
                <span className="menu-item-title">{t('header.profile')}</span>
              </Link>
            </li>
            <li className="menu-item" onClick={() => setIsMenu(!isMenu)}>
              <img className="icon" onClick={handleSignOut} src={logout} alt="logout" />
              <span onClick={handleSignOut} className="menu-item-title">
                {t('header.signOut')}
              </span>
            </li>
            <li className="menu-item" onClick={() => setIsMenu(!isMenu)}>
              <Localize />
              <span onClick={lingChange} className="menu-item-title">
                {t('header.toggleLng')}
              </span>
            </li>
          </ul>
        ) : (
          <ul className="burger-menu">
            <li className="menu-item" onClick={() => setIsMenu(!isMenu)}>
              <Link to={ROUTES.SIGN_IN_PAGE} className="nav__link">
                <img className="icon" src={signIn} alt="user profile" />
                <span className="menu-item-title">{t('header.signIn')}</span>
              </Link>
            </li>
            <li className="menu-item" onClick={() => setIsMenu(!isMenu)}>
              <Link to={ROUTES.SIGN_UP_PAGE} className="nav__link">
                <img className="icon" src={signUp} alt="user profile" />
                <span className="menu-item-title">{t('header.signUp')}</span>
              </Link>
            </li>
            <li
              className="menu-item"
              style={{ marginLeft: '5px' }}
              onClick={() => setIsMenu(!isMenu)}
            >
              <Localize />
              <span onClick={lingChange} className="menu-item-title">
                {t('header.toggleLng')}
              </span>
            </li>
          </ul>
        )}
      </div>
    </div>
  );
};

export default Burger;
