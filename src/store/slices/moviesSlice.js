import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  getAll,
  getAllByQuery,
  getMovieDetail,
} from "../../services/tmdbService";
import { moviesFromLocalStorage } from "../../utils/local-movies";

const initialState = {
  currentMovie: {},
  favoritesFiltered: [],
  movies: {
    list: [],
    totalPages: 0,
  },
  favorites: {
    list: [],
    totalPages: 0,
  },
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

export const fetchMovieDetail = createAsyncThunk(
  "movies/fetchMovieDetail",
  async ({ query, language = "en-US" }, thunkApi) => {
    const res = await getMovieDetail({ id: query, language });
    const { id, overview, release_date, title, poster_path, vote_average } =
      res;
    const poster = `https://image.tmdb.org/t/p/w500${poster_path}`;

    return {
      id,
      overview,
      title,
      poster,
      releaseDate: release_date,
      rating: vote_average,
    };
  }
);

const moviesSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    addFavoriteMovie: (state, action) => {
      state.favorites.list.push({ ...action.payload });
    },
    removeFavoriteMovie: (state, action) => {
      state.favorites.list = [
        ...state.favorites.list.filter((movie) => movie.id !== action.payload),
      ];
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    searchFavoriteMovies: (state, action) => {
      const { payload } = action;
      state.favoritesFiltered = [
        ...state.favorites.list.filter(
          (movie) =>
            movie.title.toLowerCase().includes(payload) ||
            movie.releaseDate.toLowerCase().includes(payload) ||
            movie.rating.toString().toLowerCase().includes(payload)
        ),
      ];
    },
    getFavoriteMovies: (state, action) => {
      state.favorites.list = [...moviesFromLocalStorage()];
      const totalPages = state.favorites.length > 0 ? Math.ceil(state.favorites.list.length / 20) : 1;
      state.favorites.totalPages = totalPages;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchMovies.fulfilled, (state, action) => {
      state.movies.list = [...action.payload["movies"]];
      state.movies.totalPages = action.payload["totalPages"];
      state.isLoading = false;
    });

    builder.addCase(fetchMoviesByQuery.fulfilled, (state, action) => {
      state.movies.list = [...action.payload["movies"]];
      state.totalPages = action.payload["totalPages"];
      state.isLoading = false;
    });

    builder.addCase(fetchMovieDetail.fulfilled, (state, action) => {
      state.currentMovie = { ...action.payload };
      state.isLoading = false;
    });

    builder.addCase(fetchMoviesByQuery.pending, (state, action) => {
      state.isLoading = true;
    });

    builder.addCase(fetchMovies.pending, (state, action) => {
      state.isLoading = true;
    });

    builder.addCase(fetchMovieDetail.pending, (state, action) => {
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

    builder.addCase(fetchMovieDetail.rejected, (state, action) => {
      state.isError = true;
      state.isLoading = false;
    });
  },
});

export const {
  addFavoriteMovie,
  removeFavoriteMovie,
  searchFavoriteMovies,
  setLoading,
  getFavoriteMovies,
} = moviesSlice.actions;
export default moviesSlice.reducer;
