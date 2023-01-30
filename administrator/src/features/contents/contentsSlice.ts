import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import apiAxios from "app/apiAxios";
import { RootState } from "app/store";

const SELF = "self";
const WITH = "with";
const GUIDE = "guide";
export type TYPE_SELF = "self";
export type TYPE_WITH = "with";
export type TYPE_GUIDE = "guide";

type ContentsType = {
  index: number;
  type: TYPE_SELF | TYPE_WITH | TYPE_GUIDE;
  title: string;
  description: string;
};

export interface ContentsState {
  contentsList: ContentsType[];
  status: "idle" | "loading" | "success" | "failed";
}

const initialState: ContentsState = {
  contentsList: [
    { index: 1, type: SELF, title: "피그마", description: "메신저기반" },
    { index: 2, type: SELF, title: "피그마", description: "메신저기반" },
    { index: 3, type: SELF, title: "피그마", description: "메신저기반" },
    { index: 4, type: SELF, title: "피그마", description: "메신저기반" },
    { index: 5, type: SELF, title: "피그마", description: "메신저기반" },
    { index: 6, type: SELF, title: "피그마", description: "메신저기반" },
    { index: 7, type: SELF, title: "피그마", description: "메신저기반" },
    { index: 8, type: SELF, title: "피그마", description: "메신저기반" },
    { index: 9, type: SELF, title: "피그마", description: "메신저기반" },
    { index: 10, type: SELF, title: "피그마", description: "메신저기반" },
    { index: 11, type: SELF, title: "피그마", description: "메신저기반" },
    { index: 12, type: SELF, title: "피그마", description: "메신저기반" },
    { index: 13, type: SELF, title: "피그마", description: "메신저기반" },
    { index: 14, type: SELF, title: "피그마", description: "메신저기반" },
    { index: 15, type: SELF, title: "피그마", description: "메신저기반" },
    { index: 16, type: SELF, title: "피그마", description: "메신저기반" },
    { index: 17, type: SELF, title: "피그마", description: "메신저기반" },
    { index: 18, type: SELF, title: "피그마", description: "메신저기반" },
    { index: 19, type: SELF, title: "피그마", description: "메신저기반" },
    { index: 20, type: SELF, title: "피그마", description: "메신저기반" },
    { index: 21, type: SELF, title: "피그마", description: "메신저기반" },
    { index: 22, type: SELF, title: "피그마", description: "메신저기반" },
    { index: 23, type: SELF, title: "피그마", description: "메신저기반" },
    { index: 24, type: SELF, title: "피그마", description: "메신저기반" },
    { index: 25, type: SELF, title: "피그마", description: "메신저기반" },
    { index: 26, type: SELF, title: "피그마", description: "메신저기반" },
  ],
  status: "idle",
};
export const getContentsList = createAsyncThunk(
  "contents/getContentsList",
  async ({ type }: any, { rejectWithValue }) => {
    try {
      const response = await apiAxios.get(`/contents/${type}`);
      console.log(response); //
      return response;
    } catch (error: any) {
      console.log(error); //
      return rejectWithValue(error.message);
    }
  }
);
export const contentsSlice = createSlice({
  name: "contents",
  initialState,
  reducers: {},
});

export const {} = contentsSlice.actions;

export const selectContentsList = (state: RootState) =>
  state.contents.contentsList;

export default contentsSlice.reducer;
