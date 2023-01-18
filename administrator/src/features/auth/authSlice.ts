import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import apiAxios from "app/apiAxios";
import { RootState } from "app/store";

export interface AuthState {
  accessToken: string | undefined;
  status: "idle" | "loading" | "success" | "failed";
}

const initialState: AuthState = {
  accessToken: undefined,
  status: "idle",
};

export const loginAdmin = createAsyncThunk(
  "auth/loginAdmin",
  async ({ email }: any, { rejectWithValue }) => {
    try {
      const response = await apiAxios.post("/admin/login", { email: email });
      console.log(response);
      return response;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
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

export const {} = authSlice.actions;

export const selectAccessToken = (state: RootState) => state.auth.accessToken;

export default authSlice.reducer;
