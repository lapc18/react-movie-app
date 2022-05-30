import React, { useEffect, useState } from "react";
import {
  Button,
  CardMedia,
  Chip,
  Grid,
  IconButton,
  Typography,
  Stack,
} from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchMovieDetail } from "../../store/slices/moviesSlice";
import { Box } from "@mui/system";
import moment from "moment";
import {
  saveMoviesInLocalStore,
  moviesFromLocalStorage,
  removeMovieFromLocalStore,
} from "../../utils/local-movies";

export const Detail = () => {
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isFavoriteMovie, setIsFavoriteMovie] = useState(false);
  const state = useSelector((state) => state.movie.currentMovie);
  const { title, releaseDate, poster, rating, overview } = state;
  const releaseYear = moment(releaseDate).format("YYYY");
  const localMovies = moviesFromLocalStorage();

  const onToggleFavorite = () => {
    isFavoriteMovie
      ? removeMovieFromLocalStore(state)
      : saveMoviesInLocalStore(state);
    setIsFavoriteMovie(!isFavoriteMovie);
  };

  useEffect(() => {
    const isFavorite =
      [...localMovies].find((x) => x.id.toString() === params["id"]) !==
      undefined;
    setIsFavoriteMovie(isFavorite);
  }, [localMovies, params]);

  useEffect(() => {
    dispatch(fetchMovieDetail({ query: params["id"] }));
  }, [dispatch, params]);

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Box
          sx={{
            height: "90vh",
            width: "100vw",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              padding: 10,
            }}
          >
            <CardMedia
              sx={{
                width: "30vw",
                margin: "auto",
                objectFit: "contain",
                borderRadius: 6,
              }}
              component="img"
              src={poster}
              alt={title}
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "start",
              justifyContent: "center",
              flexDirection: "column",
            }}
          >
            <Box>
              <Typography variant="h4" color="black" sx={{ paddingBottom: 4 }}>
                {title}
              </Typography>
              <Stack direction="row" spacing={1}>
                <Chip label={`Rating: ${rating}`} variant="outlined" />
                <Chip
                  label={`Release year: ${releaseYear}`}
                  variant="outlined"
                />
              </Stack>
              <Typography variant="h6" color="gray" sx={{ paddingBottom: 1 }}>
                Synopsis:
              </Typography>
              <Typography
                variant="subtitle1"
                color="text.secondary"
                sx={{ width: "60%" }}
              >
                {overview}
              </Typography>
            </Box>
            <Box sx={{ paddingTop: 4 }}>
              <Button
                variant="outlined"
                onClick={() => navigate("/")}
                sx={{ marginRight: 1 }}
              >
                Go back
              </Button>
              <IconButton
                sx={{ marginLeft: 1 }}
                onClick={() => onToggleFavorite()}
              >
                {isFavoriteMovie ? <FavoriteIcon /> : <FavoriteBorderIcon />}
              </IconButton>
            </Box>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};
