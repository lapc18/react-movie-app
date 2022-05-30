import React from "react";
import PropTypes from "prop-types";
import { Pagination } from "@mui/material";

export const GridPagination = ({count, page, onPageChange}) => {
  return <Pagination count={count} page={page} onChange={(e, value) => onPageChange && onPageChange(value)} variant="outlined" shape="rounded" />;
};

GridPagination.propTypes = {
    count: PropTypes.number.isRequired,
    page: PropTypes.number.isRequired,
    onPageChange: PropTypes.func,
}