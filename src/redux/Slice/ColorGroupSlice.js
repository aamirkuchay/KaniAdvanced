import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { GET_COLOR_URL } from "../../Constants/utils";


export const fetchcolorGroup = createAsyncThunk(
  "fetchcolorGroup",
  async (accessToken) => {
    const response = await fetch(GET_COLOR_URL, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.json();
  }
);

const colorGroupSLice = createSlice({
  name: "colorGroup",
  initialState: {
    loading: false,
    data: null,
    error: false,
  },
  //returned data is in action.payload
  extraReducers: (builder) => {
    builder.addCase(fetchcolorGroup.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.error = false;
    });
    builder.addCase(fetchcolorGroup.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(fetchcolorGroup.rejected, (state, action) => {
      state.loading = true;
      state.error = action.payload;
    });
  },
});
export default colorGroupSLice.reducer;
