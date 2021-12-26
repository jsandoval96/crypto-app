import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface AuthState {
  isAuthenticated: boolean;
  token: string | null;
  user: null;
}

const initialState: AuthState = {
  isAuthenticated: false,
  token: null,
  user: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    authenticate: (state, action: PayloadAction<AuthState>) => {
      return { ...state, ...action.payload };
    },
    logout: () => {
      return initialState;
    },
  },
});

export const { authenticate, logout } = authSlice.actions;
export default authSlice.reducer;
