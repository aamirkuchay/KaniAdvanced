import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { VIEW_ALL_HSNCODE } from "../../Constants/utils";


export const fetchHsnCode = createAsyncThunk(
  "fetchHsnCode",
  async (accessToken) => {
    const response = await fetch(VIEW_ALL_HSNCODE, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.json();
  }
);

const HsnCodeSlice = createSlice({
  name: "HsnCode",
  initialState: {
    loading: false,
    data: null,
    error: false,
  },
  //returned data is in action.payload
  extraReducers: (builder) => {
    builder.addCase(fetchHsnCode.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.error = false;
    });
    builder.addCase(fetchHsnCode.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(fetchHsnCode.rejected, (state, action) => {
      state.loading = true;
      state.error = action.payload;
    });
  },
});
export default HsnCodeSlice.reducer;
