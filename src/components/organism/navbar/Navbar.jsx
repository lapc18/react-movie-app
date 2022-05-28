import React, { useState } from "react";
import {
  AppBar,
  Container,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import PropTypes from "prop-types";
import { AppDrawer } from "../../molecules/drawer/Drawer";

export const Navbar = (props) => {
  const [isOpenDrawer, setIsOpenDrawer] = useState(false);
  return (
    <>
      <AppBar position="sticky" sx={{ mb: 2 }}>
        <Toolbar>
          <IconButton
            aria-label="menu"
            size="large"
            edge="start"
            color="inherit"
            sx={{ mr: 2 }}
            onClick={() => setIsOpenDrawer(true)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 2 }}>
            Movies App
          </Typography>
        </Toolbar>
      </AppBar>
      <AppDrawer isOpen={isOpenDrawer} onClose={() => setIsOpenDrawer(false)} />
      <Container maxWidth="false" disableGutters={false}>
        {props.children}
      </Container>
    </>
  );
};

Navbar.propTypes = {
  children: PropTypes.node,
};
