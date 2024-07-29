import { configureStore } from "@reduxjs/toolkit";

import movieSlice from './movieSlice';

const appStore = configureStore({
  reducer: {
    // NEEDS TO BE REPLACED
    movie: movieSlice,
  },
});

export default appStore;