import { useAppDispatch, useAppSelector } from 'app/hooks';
import Burger from 'components/Burger/Burger';
import Footer from 'components/Footer/Footer';
import Header from 'components/Header/Header';
import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { getUsers } from 'utils/API/get-users';
import './Layout.css';
const Layout = () => {
  const { token } = useAppSelector((state) => state.auth);
  const appDispatch = useAppDispatch();
  useEffect(() => {
    token && appDispatch(getUsers());
  }, [token, appDispatch]);
  return (
    <>
      <Burger />
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default Layout;
