import Footer from 'components/Footer/Footer';
import Header from 'components/Header/Header';
import React from 'react';
import './App.css';
import { ROUTES } from 'utils/const/routes';
import { Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Page404 from 'pages/Page404/Page404';
import SignUp from 'pages/SignUp/SignUp';
import Home from 'pages/Home/Home';
import SignIn from 'pages/SignIn/SignIn';

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path={ROUTES.HOME_PAGE} element={<Home />} />
        <Route path={ROUTES.SIGN_IN_PAGE} element={<SignIn />} />
        <Route path={ROUTES.SIGN_UP_PAGE} element={<SignUp />} />
        <Route path={ROUTES.NOT_FOUND_PAGE} element={<Page404 />} />
        <Route path={ROUTES.ANY_PAGE} element={<Navigate to={ROUTES.NOT_FOUND_PAGE} replace />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
