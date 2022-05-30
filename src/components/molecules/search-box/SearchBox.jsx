import React from "react";
import PropTypes from "prop-types";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import MovieIcon from "@mui/icons-material/Movie";

export const SearchBox = ({ onSearch, placeholder = "Search", value }) => {

  const onInputChange = (value) => {
    onSearch && onSearch(value);
  }

  return (
    <Paper
      sx={{ p: "2px 4px", display: "flex", alignItems: "center", width: "80%" }}
    >
      <IconButton sx={{ p: "10px" }} aria-label="movie-icon">
        <MovieIcon />
      </IconButton>
      <InputBase
        fullWidth
        sx={{ ml: 1, flex: 1 }}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onInputChange(e.target.value)}
        inputProps={{ "aria-label": placeholder }}
      />
      <IconButton type="submit" sx={{ p: "10px" }} aria-label={placeholder} onClick={() => onInputChange(value)}>
        <SearchIcon />
      </IconButton>
    </Paper>
  );
};

SearchBox.propTypes = {
  value: PropTypes.string,
  placeholder: PropTypes.string,
  onSearch: PropTypes.func,
};
