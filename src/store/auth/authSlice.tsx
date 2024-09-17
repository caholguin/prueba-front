import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Navigate } from 'react-router';
interface AuthState {
  isAuthenticated: boolean;
  user: null | { token: string };
  error: string | null;
}

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginRequest: (state, action: PayloadAction<{ username: string; password: string }>) => {       
        console.log(state,action);
      },
    loginSuccess: (state, action: PayloadAction<string>) => {
      state.isAuthenticated = true;
      state.user = { token: action.payload };
      state.error = null;    
      
    },
    loginFailure: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
    },
  },
});

export const { loginRequest, loginSuccess, loginFailure, logout } = authSlice.actions;
export default authSlice.reducer;
