import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Box from "@mui/material/Box";
import ViewSelector from "../../components/atoms/view-selector";
import MovieGrid from "../../components/organism/movies-grid";
import SearchBox from "../../components/molecules/search-box";
import {
  fetchMovies,
  fetchMoviesByQuery,
  searchFavoriteMovies,
  getFavoriteMovies,
  setCurrentView,
} from "../../store/slices/moviesSlice";
import { view } from "../../models/movies";

export const Home = () => {
  const state = useSelector((state) => state.movie);
  const [movies, setMovies] = useState(state.movies.list);
  const [searchText, setSearchText] = useState("");
  const currentView = state.currentView;
  const [pagesCount, setPagesCount] = useState(state.movies.totalPages);
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();
  const views = view;

  const onViewChange = (value) => {
    const result = state[value].list ?? [];
    dispatch(setCurrentView(value));
    setMovies(result);
    setPagesCount(result.pagesCount);
  };

  const onSearchFavorites = (value) => {
    if (value === "") {
      dispatch(getFavoriteMovies());
      setMovies(state.favorites.list);
    } else if (searchText !== value) {
      const result = state.favoritesFiltered;
      dispatch(dispatch(searchFavoriteMovies(value)));
      setMovies(result);
    }
  };

  const onSearch = (value) => {
    if (currentView.includes("favorites")) onSearchFavorites(value);
    else {
      if (value === "") {
        dispatch(fetchMovies({ page: 1, language: "us-US" }));
      } else if (searchText !== value) {
        dispatch(
          fetchMoviesByQuery({ query: value, page: page, language: "us-US" })
        );
      }
    }

    setSearchText(value);
  };

  const onPageChange = (page) => {
    setPage(page);
  };

  useEffect(() => {
    dispatch(fetchMovies({ page: page, language: "us-US" }));
    dispatch(getFavoriteMovies());
  }, [dispatch, page]);

  useEffect(() => {
    const onViewChange = (value) => {
      const result = value.includes("movies") ? state.movies.list : state.favorites.list;
      setMovies(result);
      dispatch(setCurrentView(value));
      setPagesCount(state.pagesCount);
    };
    onViewChange(currentView);
  }, [state.movies.list, state.favorites.list, state.pagesCount, currentView, dispatch]);

  return (
    <>
      <Box
        alignItems={"start"}
        sx={{
          boxShadow: 1,
          borderRadius: 2,
          p: 2,
          minWidth: 300,
          maxWidth: "100%",
          display: "flex",
          justifyContent: "center",
          flexDirection: "row",
          gap: 5,
          marginBottom: 6,
        }}
      >
        <ViewSelector
          initialView={currentView}
          views={views}
          onViewChange={onViewChange}
        />
        <SearchBox onSearch={onSearch} value={searchText} />
      </Box>
      <MovieGrid
        movies={movies}
        value={searchText}
        onPageChange={onPageChange}
        page={page}
        count={pagesCount}
      />
    </>
  );
};
