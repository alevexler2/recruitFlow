import { theme } from '../../../assets/theme';
import { ThemeProvider } from '@mui/material/styles';
import { Container as MuiContainer, Paper } from '@mui/material';

interface ContainerProps {
  children: React.ReactNode;
}


const Container: React.FC<ContainerProps> = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <MuiContainer component="main" maxWidth="xs">
        <Paper elevation={3} style={{ padding: 20, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          {children}
        </Paper>
      </MuiContainer>
    </ThemeProvider>
  )
}

export default Container