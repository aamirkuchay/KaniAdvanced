import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { VIEW_ALL_SUPPLIER_URL } from "../../Constants/utils";


export const fetchsupplier = createAsyncThunk(
  "fetchsupplier",
  async (accessToken) => {
    const response = await fetch(VIEW_ALL_SUPPLIER_URL, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.json();
  }
);

const supplierSlice = createSlice({
  name: "supplier",
  initialState: {
    loading: false,
    data: null,
    error: false,
  },
  //returned data is in action.payload
  extraReducers: (builder) => {
    builder.addCase(fetchsupplier.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.error = false;
    });
    builder.addCase(fetchsupplier.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(fetchsupplier.rejected, (state, action) => {
      state.loading = true;
      state.error = action.payload;
    });
  },
});
export default supplierSlice.reducer;
