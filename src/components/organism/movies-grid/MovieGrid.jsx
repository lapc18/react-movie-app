import React from "react";
import PropTypes from "prop-types";
import { Grid } from "@mui/material";
import { MovieItem } from "../../molecules/movie-item/MovieItem";

export const MovieGrid = ({movies}) => {
  return (
    <Grid
      container
      justifyContent={"center"}
      spacing={{ xs: 2, md: 3 }}
      columns={{ xs: 4, sm: 8, md: 12 }}
    >
      {movies.map((movie) => (
        <MovieItem key={movie.id} {...movie} />
      ))}
    </Grid>
  );
};

MovieGrid.propTypes = {
  movies: PropTypes.array.isRequired,
};
