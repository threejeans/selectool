import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "app/store";

export interface AuthState {
  isLoginModal: boolean;
}

const initialState: AuthState = {
  isLoginModal: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginModalOpen: (state) => {
      state.isLoginModal = true;
    },
    loginModalClose: (state) => {
      state.isLoginModal = false;
    },
  },
});

export const { loginModalOpen, loginModalClose } = authSlice.actions;

export const selectLoginModal = (state: RootState) => state.auth.isLoginModal;

export default authSlice.reducer;
