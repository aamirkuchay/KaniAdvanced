import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { VIEW_ALL_SIZE } from "../../Constants/utils";


export const fetchsize = createAsyncThunk(
  "fetchsize",
  async (accessToken) => {
    const response = await fetch(VIEW_ALL_SIZE, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.json();
  }
);

const sizeSlice = createSlice({
  name: "size",
  initialState: {
    loading: false,
    data: null,
    error: false,
  },
  //returned data is in action.payload
  extraReducers: (builder) => {
    builder.addCase(fetchsize.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.error = false;
    });
    builder.addCase(fetchsize.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(fetchsize.rejected, (state, action) => {
      state.loading = true;
      state.error = action.payload;
    });
  },
});
export default sizeSlice.reducer;
