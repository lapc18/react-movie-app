import { createTheme } from "@mui/material";


export const customTheme = createTheme({
    palette: {
        primary: {
          main: '#0e2541',
        },
        secondary: {
          main: '#215697',
        },
    },
    components: {
      MuiDrawer: {
        styleOverrides: {
          paper: {
            backgroundColor: "#317ad4",
            color: "#ffffff",
          }
        }
      },
      MuiTypography: {
        defaultProps: {color: "#fff"}
      }
    },
});