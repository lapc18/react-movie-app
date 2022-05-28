import {
  Box,
  Drawer,
  List,
} from "@mui/material";
import HomeIcon from '@mui/icons-material/Home';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { nanoid } from "@reduxjs/toolkit";
import { ListItemLink } from "../../atoms/list-item-link/ListItemLink";

export const AppDrawer = ({ isOpen = false, onClose }) => {
  const items = (
    <List>
      {drawerItems().map((item, index) => (
        <ListItemLink key={index} {...item} />
      ))}
    </List>
  );

  return (
    <Drawer anchor="left" open={isOpen} onClose={() => onClose && onClose()}>
      <Box sx={{ width: 250 }} role="presentation">
        {items}
      </Box>
    </Drawer>
  );
};

const drawerItems = () => [
  {
    id: nanoid(),
    text: "Home",
    to: "/",
    icon: <HomeIcon />,
  },
  {
    id: nanoid(),
    text: "Favorites",
    to: "/favorites",
    icon: <FavoriteIcon />,
  },
];
