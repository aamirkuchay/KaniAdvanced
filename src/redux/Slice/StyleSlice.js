import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { VIEW_ALL_STYLE } from "../../Constants/utils";


export const fetchstyle = createAsyncThunk(
  "fetchstyle",
  async (accessToken) => {
    const response = await fetch(VIEW_ALL_STYLE, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.json();
  }
);

const styleSlice = createSlice({
  name: "style",
  initialState: {
    loading: false,
    data: null,
    error: false,
  },
  //returned data is in action.payload
  extraReducers: (builder) => {
    builder.addCase(fetchstyle.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.error = false;
    });
    builder.addCase(fetchstyle.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(fetchstyle.rejected, (state, action) => {
      state.loading = true;
      state.error = action.payload;
    });
  },
});
export default styleSlice.reducer;
