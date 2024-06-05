import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { VIEW_ALL_MATERIAL_URL } from "../../Constants/utils";


export const fetchmaterial = createAsyncThunk(
  "fetchmaterial",
  async (accessToken) => {
    const response = await fetch(VIEW_ALL_MATERIAL_URL, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.json();
  }
);

const materialSlice = createSlice({
  name: "material",
  initialState: {
    loading: false,
    data: null,
    error: false,
  },
  //returned data is in action.payload
  extraReducers: (builder) => {
    builder.addCase(fetchmaterial.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.error = false;
    });
    builder.addCase(fetchmaterial.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(fetchmaterial.rejected, (state, action) => {
      state.loading = true;
      state.error = action.payload;
    });
  },
});
export default materialSlice.reducer;
