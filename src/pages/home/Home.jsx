import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MovieGrid } from "../../components/organism/movies-grid/MovieGrid";
import { fetchMovies } from "../../store/slices/moviesSlice";

export const Home = () => {
  const dispatch = useDispatch();
  const movies = useSelector((state) => state.movie.movies);

  useEffect(() => {
    dispatch(fetchMovies({ page: 1, language: "us-US" }));
  }, [dispatch]);

  return (
    <>
      <MovieGrid movies={movies} />
    </>
  );
};
