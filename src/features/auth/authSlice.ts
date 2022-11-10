import { createAsyncThunk, createSlice, PayloadAction, SerializedError } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { FAILED, IDLE, LOADING } from '../../helpers/constants/status';
import { AUTH_SIGNIN, AUTH_SIGNUP, BASE_URL } from '../../helpers/constants/urls';

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

export const signUp = createAsyncThunk(
  'auth/signUp',
  async (_, { rejectWithValue, dispatch, getState }) => {
    const state = getState() as RootState;
    const { name, login, password } = state.auth;
    try {   
      const response = await fetch(BASE_URL + AUTH_SIGNUP, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name,
          login,
          password,
        })
      });
      console.log(await response)
      const data = await response.json();
      console.log(data)
      if (!response.ok) {
        throw new Error(data.message);
      }
      dispatch(addUserId(data._id))
    } catch (e) {
      const error = e as Error;
      return rejectWithValue(error.message);
    }
  }
);
export const signIn = createAsyncThunk(
  'auth/signIn',
  async (_, { rejectWithValue, dispatch, getState }) => {
    const state = getState() as RootState;
    const { login, password } = state.auth;
    try {    
      const response = await fetch(BASE_URL + AUTH_SIGNIN, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          login,
          password,
        })
      });
      console.log(await response)
      const data = await response.json();
      console.log(data)
      if (!response.ok) {
        throw new Error(data.message);
      }
      dispatch(addToken(data.token))
    } catch (e) {
      const error = e as Error;
      return rejectWithValue(error.message);
    }
  }
);
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
  extraReducers: (builder) => {
    builder
      .addCase(signUp.pending, loaderHandler)
      .addCase(signUp.fulfilled, dataHandler)
      .addCase(signUp.rejected, errorHandler)
      .addCase(signIn.pending, loaderHandler)
      .addCase(signIn.fulfilled, dataHandler)
      .addCase(signIn.rejected, errorHandler);
  },
});

export const { addLogin, addName, addPassword, addToken, addUserId } = authSlice.actions;

export const selectToken = (state: RootState) => state.auth.token;

export default authSlice.reducer;
