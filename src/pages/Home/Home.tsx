import { useAppSelector } from 'app/hooks';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from 'utils/const/routes';
import './Home.scss';
import '../../App.css';
import { useTranslation, Trans } from 'react-i18next';

const lingRevert = {
  en: 'ru',
  ru: 'en',
};
function Home() {
  const { token } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();
  useEffect(() => {
    !token && navigate(ROUTES.WELCOME_PAGE);
  }, [token, navigate]);
  const { t, i18n } = useTranslation();
  const lingChange = () => {
    const ling = i18n.resolvedLanguage as keyof typeof lingRevert;
    i18n.changeLanguage(lingRevert[ling]);
  };
  return (
    <div>
      <h2>Homepage</h2>
      <header className="App-header">
        <div>
          <button onClick={lingChange}>{i18n.resolvedLanguage.toUpperCase()}</button>
        </div>
        <p>
          <Trans i18nKey="description.part1"></Trans>
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          {t('description.part2')}
        </a>
      </header>
    </div>
  );
}

export default Home;
