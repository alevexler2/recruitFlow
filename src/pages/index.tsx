import React, { useState } from 'react';
import { Box, Button, Grid, Snackbar, Typography } from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import { colors } from '../assets/colors';
import Container from '../components/general/container/Container';
import Form from '../components/general/Form/Form';
import AuthService from '../config/firebaseConfig';
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const navigate = useNavigate();
  const fields = [
    { label: 'Correo Electrónico', name: 'email', type: 'email' },
    { label: 'Contraseña', name: 'password', type: 'password' },
  ];

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const onLogin = async (formData: Record<string, string>) => {
    try {
      const userCredential = await AuthService.signInWithEmailAndPassword(formData.email, formData.password);
      const accesToken = await userCredential.user?.getIdToken();
      localStorage.setItem("userToken", accesToken);
      navigate('/interview');
    } catch {
      setSnackbarMessage('Error al iniciar sesión. Por favor, verifica tus credenciales.');
      setSnackbarOpen(true);
    }
  };

  return (
    <Grid container sx={{ height: '100vh', background: colors.negro }}>
      <Grid item xs={12} md={6} sx={{ padding: '40px' }} display="flex" justifyContent="center" textAlign="center">
        <Box mt={16}>
          <Typography variant="h2" mb={8} color={colors.blanco}>
            Bienvenido a RecruitFlow
          </Typography>
          <Typography variant="body1" color={colors.blanco}>
            La aplicación que utiliza la inteligencia artificial de OpenAI
          </Typography>
          <Typography variant="body1" color={colors.blanco}>
            para realizar entrevistas de trabajo de manera eficiente y personalizada.
          </Typography>
        </Box>
      </Grid>

      <Grid item xs={12} mt={16} md={6} sx={{ padding: '40px', textAlign: 'left' }}>
        <Container>
          <Form
            title="Iniciar Sesión"
            fields={fields}
            onSubmit={onLogin}
            submitButtonText="Iniciar Sesión"
            additionalButton={<Button onClick={() => navigate("/register")} variant="outlined" style={{ backgroundColor: colors.azulProfundo, color: '#FFFFFF' }} fullWidth> ¿No tienes cuenta? ¡Regístrate aquí! </Button>}
          />
        </Container>
      </Grid>
      <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose}>
        <MuiAlert elevation={6} variant="filled" severity="error">
          {snackbarMessage}
        </MuiAlert>
      </Snackbar>
    </Grid>
  );
};

export default Login;