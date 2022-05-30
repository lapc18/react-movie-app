import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAll, getAllByQuery } from "../../services/tmdbService";

const initialState = {
  moviesFiltered: [],
  movies: [],
  favorites: [],
  isError: false,
  isLoading: false,
};

export const fetchMovies = createAsyncThunk(
  "movies/fetchMovies",
  async ({ page = 1, language = "en-US" }, thunkApi) => {
    const res = await getAll({ page: page, language: language });
    const { results, total_pages, total_results } = res;
    const movies = results.map((movie) => {
      const { id, overview, release_date, title, poster_path, vote_average } =
        movie;
      const poster = `https://image.tmdb.org/t/p/w500${poster_path}`;
      return {
        id,
        overview,
        title,
        poster,
        releaseDate: release_date,
        rating: vote_average,
      };
    });
    return { movies, totalPages: total_pages, totalResults: total_results };
  }
);

export const fetchMoviesByQuery = createAsyncThunk(
  "movies/fetchMoviesByQuery",
  async ({ query, page = 1, language = "en-US" }, thunkApi) => {
    const res = await getAllByQuery({ query, page, language });
    const { results, total_pages, total_results } = res;
    const movies = results.map((movie) => {
      const { id, overview, release_date, title, poster_path, vote_average } =
        movie;
      const poster = `https://image.tmdb.org/t/p/w500${poster_path}`;
      return {
        id,
        overview,
        title,
        poster,
        releaseDate: release_date,
        rating: vote_average,
      };
    });
    return { movies, totalPages: total_pages, totalResults: total_results };
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
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    searchMovies: (state, action) => {
      const { view, text } = action;
      state.moviesFiltered = [
        ...state[view].filter(
          (movie) =>
            movie.title.toLowerCase().includes(text) ||
            movie.releaseDate.toLowerCase().includes(text) ||
            movie.rating.toString().toLowerCase().includes(text)
        ),
      ];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchMovies.fulfilled, (state, action) => {
      state.movies = [...action.payload["movies"]];
      state.isLoading = false;
    });

    builder.addCase(fetchMoviesByQuery.fulfilled, (state, action) => {
      state.movies = [...action.payload["movies"]];
      state.isLoading = false;
    });

    builder.addCase(fetchMoviesByQuery.pending, (state, action) => {
      state.isLoading = true;
    });

    builder.addCase(fetchMovies.pending, (state, action) => {
      state.isLoading = true;
    });

    builder.addCase(fetchMoviesByQuery.rejected, (state, action) => {
      state.isError = true;
      state.isLoading = false;
    });

    builder.addCase(fetchMovies.rejected, (state, action) => {
      state.isError = true;
      state.isLoading = false;
    });
  },
});

export const {
  addFavoriteMovie,
  removeFavoriteMovie,
  searchMovies,
  setLoading,
} = moviesSlice.actions;
export default moviesSlice.reducer;
