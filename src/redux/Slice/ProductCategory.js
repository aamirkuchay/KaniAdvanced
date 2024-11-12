import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { VIEW_ALL_PRODUCTCATEGORY } from "../../Constants/utils";


export const fetchProductCategory = createAsyncThunk(
  "fetchProductCategory",
  async (accessToken) => {
    const response = await fetch(VIEW_ALL_PRODUCTCATEGORY, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.json();
  }
);

const ProductCategorySLice = createSlice({
  name: "ProductCategory",
  initialState: {
    loading: false,
    data: null,
    error: false,
  },
  //returned data is in action.payload
  extraReducers: (builder) => {
    builder.addCase(fetchProductCategory.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.error = false;
    });
    builder.addCase(fetchProductCategory.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(fetchProductCategory.rejected, (state, action) => {
      state.loading = true;
      state.error = action.payload;
    });
  },
});
export default ProductCategorySLice.reducer;
