import { useAppDispatch } from 'app/hooks';
import Footer from 'components/Footer/Footer';
import Header from 'components/Header/Header';
import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { getUsers } from 'utils/API/get-users';
import './Layout.css';
const Layout = () => {
  const appDispatch = useAppDispatch();
  useEffect(() => {
    appDispatch(getUsers());
  }, [appDispatch]);
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default Layout;
