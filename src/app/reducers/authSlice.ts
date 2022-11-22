import { createSlice, PayloadAction, SerializedError } from '@reduxjs/toolkit';
import { signIn } from 'utils/API/sign-in';
import { signUp } from 'utils/API/sign-up';
import { RootState } from '../store';
import { FAILED, IDLE, LOADING } from '../../utils/const/status';
import { getUsers } from 'utils/API/get-users';
import { updateUser } from 'utils/API/update-user';

export interface User {
  name: string;
  login: string;
  _id: string;
}
export interface IAuthState {
  name: string;
  login: string;
  password: string;
  token: string;
  status: string;
  errorMessage: string;
  userId: string;
  users: User[];
}

const initialState: IAuthState = {
  name: '',
  login: localStorage.getItem('login') || '',
  password: '',
  userId: '',
  token: localStorage.getItem('token') || '',
  status: '',
  errorMessage: '',
  users: [],
};

export type IAction = PayloadAction<
  unknown,
  string,
  {
    arg: void;
    requestId: string;
    requestStatus: 'rejected';
    aborted: boolean;
    condition: boolean;
  } & (
    | {
        rejectedWithValue: true;
      }
    | ({
        rejectedWithValue: false;
      } & Record<string, unknown>)
  ),
  SerializedError
>;

const errorHandler = (state: IAuthState, action: IAction) => {
  state.status = FAILED;
  state.errorMessage = action.payload as string;
};
const loaderHandler = (state: IAuthState) => {
  state.status = LOADING;
  state.errorMessage = '';
};
const dataHandler = (state: IAuthState) => {
  state.status = IDLE;
  state.errorMessage = '';
};
export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    addName: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    },
    addLogin: (state, action: PayloadAction<string>) => {
      state.login = action.payload;
    },
    addPassword: (state, action: PayloadAction<string>) => {
      state.password = action.payload;
    },
    addToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
    addUserId: (state, action: PayloadAction<string>) => {
      state.userId = action.payload;
    },
    addAllUsers: (state, action: PayloadAction<User[]>) => {
      state.users = action.payload;
    },
    clearErrors: (state) => {
      state.status = IDLE;
      state.errorMessage = '';
    },
    setUser: (state, action: PayloadAction<User[]>) => {
      const users = action.payload;
      const user = users.find((user) => user.login === state.login);
      if (user) {
        state.name = user.name;
        state.userId = user._id;
      }
    },
    signOut: (state) => {
      state.userId = '';
      state.login = '';
      state.name = '';
      state.token = '';
      state.status = '';
      state.users = [];
      localStorage.clear();
    },
  },
  extraReducers: {
    [signUp.fulfilled.type]: dataHandler,
    [signUp.pending.type]: loaderHandler,
    [signUp.rejected.type]: errorHandler,
    [signIn.fulfilled.type]: dataHandler,
    [signIn.pending.type]: loaderHandler,
    [signIn.rejected.type]: errorHandler,
    [updateUser.fulfilled.type]: dataHandler,
    [updateUser.pending.type]: loaderHandler,
    [updateUser.rejected.type]: errorHandler,
    [getUsers.fulfilled.type]: dataHandler,
    [getUsers.pending.type]: loaderHandler,
    [getUsers.rejected.type]: (state) => {
      errorHandler;
      state.token = '';
    },
  },
});

export const {
  addLogin,
  addName,
  addPassword,
  addToken,
  addUserId,
  signOut,
  addAllUsers,
  setUser,
  clearErrors,
} = authSlice.actions;

export const selectToken = (state: RootState) => state.auth.token;

export default authSlice.reducer;
