import React from "react";
import PropTypes from "prop-types";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";
import OpenInFullIcon from "@mui/icons-material/OpenInFull";
import moment from "moment";
import { useNavigate } from "react-router-dom";

export const MovieItem = ({ id, title, releaseDate, poster, rating }) => {
  const navigation = useNavigate();

  const onDetailClick = () => {
    navigation(`/detail/${id}`);
  };

  releaseDate = moment(releaseDate).format("YYYY");
  return (
    <Grid item xs={3} sm={6} md={2} sx={{ p: 0.1 }}>
      <Card variant="outlined" sx={{ width: 265, borderRadius: 4 }}>
        <CardMedia
          sx={{ width: "100%", margin: "auto", objectFit: "contain" }}
          component="img"
          src={poster}
          alt={title}
        />
        <CardContent sx={{ height: 50 }}>
          <Typography variant="h5" color="black" noWrap>
            {title}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            Release: {releaseDate} | Rating: {rating}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <Button
            variant="text"
            startIcon={<OpenInFullIcon />}
            onClick={() => onDetailClick()}
          >
            See details
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
};

MovieItem.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  releaseDate: PropTypes.string.isRequired,
  poster: PropTypes.string.isRequired,
  rating: PropTypes.number.isRequired,
};
