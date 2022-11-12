import { useAppSelector } from 'app/hooks';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from 'utils/const/routes';
import './Home.scss';

function Home() {
  const { token } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();
  useEffect(() => {
    !token && navigate(ROUTES.WELCOME_PAGE);
  }, [token, navigate]);
  return (
    <div>
      <h2>Homepage</h2>
    </div>
  );
}

export default Home;
