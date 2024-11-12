import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { VIEW_ALL_DESIGN} from "../../Constants/utils";


export const fetchdesign = createAsyncThunk(
  "fetchdesign",
  async (accessToken) => {
    const response = await fetch(VIEW_ALL_DESIGN, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.json();
  }
);

const designSlice = createSlice({
  name: "design",
  initialState: {
    loading: false,
    data: null,
    error: false,
  },
  //returned data is in action.payload
  extraReducers: (builder) => {
    builder.addCase(fetchdesign.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.error = false;
    });
    builder.addCase(fetchdesign.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(fetchdesign.rejected, (state, action) => {
      state.loading = true;
      state.error = action.payload;
    });
  },
});
export default designSlice.reducer;
