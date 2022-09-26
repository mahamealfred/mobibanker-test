import { createTheme } from "@mui/material/styles";
import { lighten } from "polished";

export const DrawerWidth = 250;

export const Colors = {
  primary: "#5f2c3e",
  secondary: "#d1adcc",
  success: "#4CAF50",
  info: "#00a2ff",
  danger: "#FF5722",
  warning: "#FFC107",
  dark: "#0e1b20",
  light: "#aaa",
  muted: "#abafb3",
  border: "#DDDFE1",
  inverse: "#2F3D4A",
  shaft: "#333",
  ///////////////
  // Grays
  ///////////////
  dim_grey: "#696969",
  dove_gray: "#d5d5d5",
  body_bg: "#f3f6f9",
  light_gray: "rgb(230,230,230)",
  ///////////////
  // Solid Color
  ///////////////
  white: "#fff",
  black: "#000",
};
export const flexBetween = {
  display: 'flex',
  justifyContent: 'space-between',
};

export const flexBetweenCenter = {
  display: 'flex',
  justifyContent: { xs: 'center', md: 'space-between' },
  alignItems: 'center',
};

export const footerLayout = {
  display: 'flex',
  flexDirection: { sx: 'column' },
  justifyContent: { xs: 'center', md: 'space-between' },
  alignItems: 'center',
};

export const flexCenter = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};

export const fullWidthFlex = {
  display: 'flex',
  width: '100%',
};

export const justifyCenter = { display: 'flex', justifyContent: 'center' };

export const dFlex = {
  display: 'flex',
  flexDirection: 'row',
};

export const fixedBottom = {
  position: 'absolute',
  bottom: 100,
  width: '100%',
};

export const displayOnDesktop = { display: { xs: 'none', md: 'block' } };

/** Custom carousel styles */

export const carouselDot = {
  color: '#fff',
  backgroundColor: '#000',
  opacity: 0.5,
  borderRadius: 10,
  p: 1,
  minWidth: 'auto',
};

export const fixedIcon = {
  position: 'absolute',
  right: 10,
  top: 10,
  zIndex: 10,
};

export const carouselImage = {
  height: 275,
  display: 'block',
  overflow: 'hidden',
  width: '100%',
  borderRadius: 3,
};

const theme = createTheme({
  palette: {
    primary: {
      main: Colors.primary,
    },
    secondary: {
      main: Colors.secondary,
    },
  },

  components: {
    MuiButton: {
      defaultProps: {
        disableRipple: true,
        disableElevation: true,
      },
    },
    MuiTooltip: {
      defaultProps: {
        arrow: true,
      },
      styleOverrides: {
        tooltip: {
          background: Colors.primary,
        },
        arrow: {
          color: Colors.primary,
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          width: DrawerWidth,          
          background: Colors.primary,
          color: Colors.secondary,
          borderRadius: '0px 100px 0px 0px',
          borderRight: `1px solid ${Colors.primary}`
        }
      }
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          borderColor: lighten(0.2, Colors.primary)
        }
      }
    },
    MyShopButton: {
      styleOverrides: {
        root: {
          color: Colors.white,
        },
        primary: {
          background: Colors.primary,
          "&:hover": {
            background: lighten(0.05, Colors.primary),
          },
        },
        secondary: {
          background: `${Colors.secondary}`,
          "&:hover": {
            background: lighten(0.05, Colors.primary),
          },
        },
      },
    },
  },
});

export default theme;
