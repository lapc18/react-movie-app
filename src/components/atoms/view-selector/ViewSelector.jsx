import React, { useState } from "react";
import PropTypes from "prop-types";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

export const ViewSelector = ({ initialView, views, onViewChange }) => {
  const [currentView, setCurrentView] = useState(initialView);


  const onChange = (value) => {
    const view = value ?? currentView;
    setCurrentView(view);
    onViewChange && onViewChange(view);
  };

  return (
    <ToggleButtonGroup
      color="primary"
      value={currentView}
      exclusive
      onChange={(e, value) => onChange(value)}
    >
      {views?.map((view, i) => (
        <ToggleButton key={i} value={view.value}>
          {view.title}
        </ToggleButton>
      ))}
    </ToggleButtonGroup>
  );
};

ViewSelector.propTypes = {
  initialView: PropTypes.string.isRequired,
  views: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
    })
  ).isRequired,
  onViewChange: PropTypes.func,
};
