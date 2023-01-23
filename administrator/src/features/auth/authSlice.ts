import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import apiAxios from "app/apiAxios";
import { RootState } from "app/store";

export interface AuthState {
  accessToken: string | undefined;
  tmpEmail: string;
  status: "idle" | "loading" | "success" | "failed";
}

const initialState: AuthState = {
  accessToken: undefined,
  tmpEmail: "",
  status: "idle",
};

export const loginAdmin = createAsyncThunk(
  "auth/loginAdmin",
  async ({ email }: any, { rejectWithValue }) => {
    try {
      const response = await apiAxios.post("/admin/login", { email: email });
      console.log(response); //
      return response;
    } catch (error: any) {
      console.log(error); //
      return rejectWithValue(error.message);
    }
  }
);
export const authAdmin = createAsyncThunk(
  "auth/authAdmin",
  async ({ email, auth }: any, { rejectWithValue }) => {
    try {
      const response = await apiAxios.post("/admin/auth", { email, auth });
      console.log(response); //
      return response;
    } catch (error: any) {
      console.log(error); //
      return rejectWithValue(error.message);
    }
  }
);
export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setTmpEmail: (state, { payload }) => {
      state.tmpEmail = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginAdmin.pending, (state) => {
        state.status = "loading";
      })
      .addCase(loginAdmin.fulfilled, (state, { payload }) => {
        state.status = "success";
        console.log(payload);
        // state.accessToken = payload;
      })
      .addCase(loginAdmin.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export const { setTmpEmail } = authSlice.actions;

export const selectAccessToken = (state: RootState) => state.auth.accessToken;
export const selectTmpEmail = (state: RootState) => state.auth.tmpEmail;

export default authSlice.reducer;
