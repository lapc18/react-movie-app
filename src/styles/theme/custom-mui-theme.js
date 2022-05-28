import { createTheme } from "@mui/material";


export const customTheme = createTheme({
    palette: {
        primary: {
          main: '#ffbbb5',
        },
        secondary: {
          main: '#e53935',
        },
    },
    components: {
      MuiDrawer: {
        styleOverrides: {
          paper: {
            backgroundColor: "#ffbbb5",
            color: "#ffffff",
          }
        }
      },
      MuiTypography: {
        defaultProps: {color: "#000"}
      }
    },
});