import { createTheme } from "@mui/material";

export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: '#323338', 
    },
    text: {
      primary: '#fff'
    },
    primary: {
      main: '#E0FB61'
    }
  },
});
