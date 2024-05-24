import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


export const fetchlocation = createAsyncThunk(
  "fetchlocation",
  async (accessToken) => {
    const response = await fetch("http://localhost:8081/location/viewAll", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.json();
  }
);

const unitSlice = createSlice({
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
export default unitSlice.reducer;
