import { deepOrange, teal, blue, green } from '@material-ui/core/colors';

const theme = {
  theme1: {
    palette: {
      primary: deepOrange,
      secondary: teal,
    },
  },
  theme2: {
    palette: {
      primary: blue,
      secondary: green,
    },
  },
};

const DefaultTheme = theme.theme1;

export { theme as default, DefaultTheme };
