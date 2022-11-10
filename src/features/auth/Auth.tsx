import React, { FormEvent } from 'react';

import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { addLogin, addName, addPassword, signIn, signUp } from './authSlice';

export default function Auth() {
  const appDispatch = useAppDispatch();
  const { name, login, password } = useAppSelector(state => state.auth);
  const handleSignUpSubmit = (e: FormEvent) => {
    e.preventDefault();
    appDispatch(signUp());
  }
  const handleSignInSubmit = (e: FormEvent) => {
    e.preventDefault();
    appDispatch(signIn());
  }
  return (
    <div>
      <h3>REGISTRATION</h3>
      <form onSubmit={handleSignUpSubmit}>
        <input type="text" placeholder='name' value={name} onChange={(e) => appDispatch(addName(e.target.value))} />
        <input type="text" placeholder='login' value={login} onChange={(e) => appDispatch(addLogin(e.target.value))} />
        <input type="password" placeholder='password' value={password} onChange={(e) => appDispatch(addPassword(e.target.value))} />
        <button>Register</button>
      </form>
      <hr />
      <h3>LOG IN</h3>
      <form onSubmit={handleSignInSubmit}>
        <input type="text" placeholder='login' value={login} onChange={(e) => appDispatch(addLogin(e.target.value))} />
        <input type="password" placeholder='password' value={password} onChange={(e) => appDispatch(addPassword(e.target.value))} />
        <button>LOG IN</button>
      </form>
    </div>
  );
}
