import React, { FormEvent } from 'react';

import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { addLogin, addName, addPassword, signIn, signUp } from './authSlice';
import styles from './Counter.module.css';

export default function Auth() {
  const appDispatch = useAppDispatch();
  const { name, login, password } = useAppSelector(state => state.auth);
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    appDispatch(signUp());
  }
  return (
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder='name' value={name} onChange={(e) => appDispatch(addName(e.target.value))} />
      <input type="text" placeholder='login' value={login} onChange={(e) => appDispatch(addLogin(e.target.value))} />
      <input type="password" placeholder='password' value={password} onChange={(e) => appDispatch(addPassword(e.target.value))} />
      <button>Register</button>
    </form>
  );
}
