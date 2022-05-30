import React from "react";
import PropTypes from "prop-types";
import { Grid } from "@mui/material";
import Box from "@mui/material/Box";
import MovieItem from "../../molecules/movie-item";
import GridPagination from "../../atoms/pagination";

export const MovieGrid = ({ movies, onPageChange, count = 1, page = 1 }) => {
  return (
    <>
      <Grid
        container
        spacing={{ sm: 0.6 }}
        columns={{ xs: 4, sm: 12, md: 10 }}
        style={{
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        {movies.map((movie) => (
          <MovieItem key={movie.id} {...movie} />
        ))}
      </Grid>
      <Box
        alignItems={"start"}
        sx={{
          maxWidth: "100%",
          display: "flex",
          justifyContent: "center",
          flexDirection: "row",
          gap: 5,
          marginBottom: 6,
          marginTop: 6,
        }}
      >
        <GridPagination onPageChange={onPageChange} count={count} page={page} />
      </Box>
    </>
  );
};

MovieGrid.propTypes = {
  movies: PropTypes.array.isRequired,
  onPageChange: PropTypes.func,
  count: PropTypes.number,
  page: PropTypes.number,
};
