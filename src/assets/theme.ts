import { colors } from './colors';
import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    primary: {
      main: colors.azulProfundo,
    },
    secondary: {
      main: colors.verdeEsperanza,
    },
    background: {
      default: colors.blanco,
      paper: colors.grisClaro,
    },
    text: {
      primary: colors.azulProfundo,
      secondary: colors.grisOscuro,
    },
  },
});
