import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { VIEW_ALL_PRODUCT_GROUP_URL } from "../../Constants/utils";


export const fetchProductGroup = createAsyncThunk(
  "fetchProductGroup",
  async (accessToken) => {
    const response = await fetch(VIEW_ALL_PRODUCT_GROUP_URL, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.json();
  }
);

const ProductGroupSLice = createSlice({
  name: "productGroup",
  initialState: {
    loading: false,
    data: null,
    error: false,
  },
  //returned data is in action.payload
  extraReducers: (builder) => {
    builder.addCase(fetchProductGroup.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.error = false;
    });
    builder.addCase(fetchProductGroup.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(fetchProductGroup.rejected, (state, action) => {
      state.loading = true;
      state.error = action.payload;
    });
  },
});
export default ProductGroupSLice.reducer;
