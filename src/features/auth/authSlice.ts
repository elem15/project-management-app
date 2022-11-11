import { createSlice, PayloadAction, SerializedError } from '@reduxjs/toolkit';
import { signIn } from 'utils/API/sign-in';
import { signUp } from 'utils/API/sign-up';
import { RootState } from '../../app/store';
import { FAILED, IDLE, LOADING } from '../../utils/const/status';

export interface IAuthState {
  name: string;
  login: string;
  password: string;
  token: string;
  status: string;
  errorMessage: string;
  userId: string;
}

const initialState: IAuthState = {
  name: '',
  login: '',
  password: '',
  userId: '',
  token: '',
  status: '',
  errorMessage: '',
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
};
const dataHandler = (state: IAuthState) => {
  state.status = IDLE;
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
  },
  extraReducers: {
    [signUp.fulfilled.type]: dataHandler,
    [signUp.pending.type]: loaderHandler,
    [signUp.rejected.type]: errorHandler,
    [signIn.fulfilled.type]: dataHandler,
    [signIn.pending.type]: loaderHandler,
    [signIn.rejected.type]: errorHandler,
  },
});

export const { addLogin, addName, addPassword, addToken, addUserId } = authSlice.actions;

export const selectToken = (state: RootState) => state.auth.token;

export default authSlice.reducer;
