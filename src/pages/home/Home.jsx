import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Box from "@mui/material/Box";
import ViewSelector from "../../components/atoms/view-selector";
import MovieGrid from "../../components/organism/movies-grid";
import SearchBox from "../../components/molecules/search-box";
import {
  fetchMovies,
  fetchMoviesByQuery,
} from "../../store/slices/moviesSlice";

export const Home = () => {
  const state = useSelector((state) => state.movie);
  const [movies, setMovies] = useState(state.movies);
  const [searchText, setSearchText] = useState("");
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();
  const views = VIEWS;
  const initialView = views[0].value;

  const onViewChange = (value) => {
    const result = state[value] ?? [];
    setMovies(result);
    setSearchText("");
  };

  const onSearch = (value) => {
    if (value === "") {
      dispatch(fetchMovies({ page: 1, language: "us-US" }));
    } else if (searchText !== value) {
      dispatch(
        fetchMoviesByQuery({ query: value, page: page, language: "us-US" })
      );
    }
    setSearchText(value);
  };

  const onPageChange = (page) => {
    setPage(page);
  }

  useEffect(() => {
    dispatch(fetchMovies({ page: page, language: "us-US" }));
  }, [dispatch, page]);

  useEffect(() => {
    const onViewChange = (value) => {
      const result = state[value] ?? [];
      setMovies(result);
    };
    onViewChange(initialView);
  }, [state, initialView]);

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
          initialView={initialView}
          views={views}
          onViewChange={onViewChange}
        />
        <SearchBox onSearch={onSearch} />
      </Box>
      <MovieGrid movies={movies} value={searchText} onPageChange={onPageChange} page={page} count={state.movies.length} />
    </>
  );
};

const VIEWS = [
  {
    value: "movies",
    title: "In Theaters",
  },
  {
    value: "favorites",
    title: "Favorites",
  },
];
