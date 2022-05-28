import React from "react";
import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import { PropTypes } from "prop-types";
import { Link } from "react-router-dom";

export const ListItemLink = ({ icon, text, to }) => {
  return (
    <ListItem component={Link} to={to}>
      <ListItemButton>
        {icon ? <ListItemIcon>{icon}</ListItemIcon> : null}
        <ListItemText> 
            <Typography>{text}</Typography>
        </ListItemText>
      </ListItemButton>
    </ListItem>
  );
};

ListItemLink.propTypes = {
  icon: PropTypes.element,
  text: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
};
