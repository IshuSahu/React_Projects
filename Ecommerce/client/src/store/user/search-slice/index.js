import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  searchResults: [],
  suggestions: [],
  total: 0,
  page: 1,
  totalPages: 0,
};

export const getSearchResults = createAsyncThunk(
  "search/getSearchResults",
  async ({ keyword, page = 1 }, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:4001/api/user/search/${keyword}?page=${page}&limit=10`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    resetSearchResults: (state) => {
      state.searchResults = [];
      state.suggestions = [];
      state.total = 0;
      state.page = 1;
      state.totalPages = 0;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getSearchResults.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getSearchResults.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.searchResults = payload.data;
        state.suggestions = payload.suggestions || [];
        state.total = payload.total;
        state.page = payload.page;
        state.totalPages = payload.totalPages;
      })
      .addCase(getSearchResults.rejected, (state) => {
        state.isLoading = false;
        state.searchResults = [];
        state.suggestions = [];
      });
  },
});

export const { resetSearchResults } = searchSlice.actions;

export default searchSlice.reducer;
