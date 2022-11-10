import Footer from 'components/Footer/Footer';
import Header from 'components/Header/Header';
import React from 'react';
import { routes } from 'utils/const/routes';
import { Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Page404 from 'pages/Page404/Page404';
import SignUp from 'pages/SignUp/SignUp';
import Home from 'pages/Home/Home';

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path={routes.homePage} element={<Home />} />
        <Route path={routes.signUpPage} element={<SignUp />} />
        <Route path={routes.notFoundPage} element={<Page404 />} />
        <Route path={routes.anyPage} element={<Navigate to={routes.notFoundPage} replace />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
