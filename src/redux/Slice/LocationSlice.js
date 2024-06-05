import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { VIEW_ALL_LOCATIONS } from "../../Constants/utils";


export const fetchlocation = createAsyncThunk(
  "fetchlocation",
  async (accessToken) => {
    const response = await fetch(VIEW_ALL_LOCATIONS, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.json();
  }
);

const locationSLice = createSlice({
  name: "location",
  initialState: {
    loading: false,
    data: null,
    error: false,
  },
  //returned data is in action.payload
  extraReducers: (builder) => {
    builder.addCase(fetchlocation.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.error = false;
    });
    builder.addCase(fetchlocation.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(fetchlocation.rejected, (state, action) => {
      state.loading = true;
      state.error = action.payload;
    });
  },
});
export default locationSLice.reducer;
