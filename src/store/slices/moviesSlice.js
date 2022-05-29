import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAll } from "../../services/tmdbService";

const initialState = {
  movies: [],
  favorites: [],
  isError: false,
  isLoading: false,
};

export const fetchMovies = createAsyncThunk(
  "movies/fetchMovies",
  async ({ page = 1, language = "en-US" }, thunkApi) => {
    const res = await getAll({ page: page, language: language });
    const movies = res.map((movie) => {
      const { id, overview, release_date, title, poster_path, vote_average } =
        movie;
      const poster = `https://image.tmdb.org/t/p/w500${poster_path}`;
      const releaseDate = release_date;
      const rating = vote_average;
      return { id, overview, releaseDate, title, poster, rating };
    });
    return movies;
  }
);

const moviesSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    addFavoriteMovie: (state, action) => {
      state.favorites.push({ ...action.payload });
    },
    removeFavoriteMovie: (state, action) => {
      state.favorites = [
        ...state.favorites.filter((movie) => movie.id !== action.payload),
      ];
    },
    fetchingMovies: (state, action) => {
      state.isLoading = true;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchMovies.fulfilled, (state, action) => {
      state.movies = [...action.payload];
    });
  },
});

export const { addFavoriteMovie, removeFavoriteMovie } = moviesSlice.actions;
export default moviesSlice.reducer;
