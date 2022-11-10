import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { signIn } from 'utils/API/sign-in';
import { signUp } from 'utils/API/sign-up';

const initialState = { error: '' };

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setError(state) {
      state.error = '';
    },
  },
  extraReducers: {
    [signUp.fulfilled.type]: (state) => {
      state.error = '';
    },
    [signIn.fulfilled.type]: (state) => {
      state.error = '';
    },
    [signUp.pending.type]: (state) => {
      state.error = '';
    },
    [signIn.pending.type]: (state) => {
      state.error = '';
    },
    [signUp.rejected.type]: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
    [signIn.rejected.type]: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
  },
});

export default authSlice.reducer;
export const {} = authSlice.actions;