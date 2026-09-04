import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import API from "../Services/api";

// Fetch products from JSON Server
export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (_, thunkAPI) => {
    try {
      const response = await API.get("/products");

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || "Failed to fetch products"
      );
    }
  }
);

const productSlice = createSlice({
  name: "products",

  initialState: {
    items: [],
    loading: false,
    error: null
  },

  reducers: {},

  extraReducers: (builder) => {

    // When API request starts
    builder.addCase(
      fetchProducts.pending,
      (state) => {
        state.loading = true;
        state.error = null;
      }
    );

    // When API request succeeds
    builder.addCase(
      fetchProducts.fulfilled,
      (state, action) => {
        state.loading = false;
        state.items = action.payload;
      }
    );

    // When API request fails
    builder.addCase(
      fetchProducts.rejected,
      (state, action) => {
        state.loading = false;
        state.error =
          action.payload || "Something went wrong";
      }
    );
  }
});

export default productSlice.reducer;