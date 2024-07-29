import {
  combineReducers,
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";
import axios from "axios";
import { MOVIE_LIST_URL } from "../constants/constant";

let initialState = {
  data: [],
  isLoading: false,
  error: {},
};
// A function that accepts a Redux action type string and a callback function that should return a promise.
// It generates promise lifecycle action
export const getMovieList = createAsyncThunk("GET/MOVIE_LIST", () => {
  return axios.get(MOVIE_LIST_URL);
});

// automatically generates action creators and action types
const getMovieListSlice = createSlice({
   //  A name, used in action types
  name: "getMovieListSlice",
  // The initial state for the reducer
  initialState,
   // An object of "case reducers". Key names will be used to generate actions.
  reducers: {
    resetMovieList: () => initialState,
  },
  // A "builder callback" function used to add more reducers
  extraReducers: (builder) => {
    builder.addCase(getMovieList.fulfilled, (state, action) => {
        state.data = action.payload?.data?.results;
        state.isLoading = false;
        state.error = {};
    })
    builder.addCase(getMovieList.pending, (state, action) => {
        state.data = [];
        state.isLoading = true;
        state.error = {};
    })
    builder.addCase(getMovieList.rejected, (state, action) => {
        state.data = [];
        state.isLoading = false;
        state.error = action.payload;
    })
  }
});

export const { resetMovieList } = getMovieListSlice.actions;

const reducer = combineReducers({
  movieList: getMovieListSlice.reducer,
});

export default reducer;
