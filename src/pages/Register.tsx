import { colors } from '../assets/colors';
import { Button, Grid, Snackbar, Alert } from '@mui/material';
import Container from '../components/general/container/Container';
import Form from '../components/general/Form/Form';
import { useNavigate } from 'react-router-dom';
import { ApiClient } from '../api/apiClient';
import { useState } from 'react';

const Register = () => {
  const [errorSnackbar, setErrorSnackbar] = useState<string | null>(null);
  const navigate = useNavigate();
  const apiClient = new ApiClient();

  const fields = [
    { label: 'Nombre', name: 'name', type: 'text' },
    { label: 'Apellido', name: 'lastName', type: 'text' },
    { label: 'Correo Electrónico', name: 'email', type: 'email' },
    { label: 'Contraseña', name: 'password', type: 'password' },
    { label: 'Repetir Contraseña', name: 'repeatPassword', type: 'password' },
  ];

  const handleRegister = async (formData: Record<string, string>) => {
    try {
      setErrorSnackbar(null);

      if (!formData.name || !formData.lastName || !formData.email || !formData.password || !formData.repeatPassword) {
        setErrorSnackbar('Por favor, complete todos los campos.');
        return;
      }

      if (formData.password !== formData.repeatPassword) {
        setErrorSnackbar('Las contraseñas no coinciden.');
        return;
      }

      const newUser = await apiClient.createUser(formData.name, formData.lastName, formData.email, formData.password);

      if (newUser) {
        navigate('/');
      }
    } catch {
      setErrorSnackbar('Hubo un error al crear el usuario. Por favor, inténtalo de nuevo.');
    }
  };

  const handleCloseSnackbar = () => {
    setErrorSnackbar(null);
  };

  return (
    <Grid container display={"flex"} alignItems={"center"} sx={{ height: '100vh', background: colors.negro }}>
      <Container>
        <Form
          title="Formulario de Registro"
          fields={fields}
          onSubmit={handleRegister}
          submitButtonText="Registrate"
          additionalButton={<Button onClick={() => navigate("/")} variant="outlined" style={{ backgroundColor: colors.azulProfundo, color: '#FFFFFF' }} fullWidth> ¿Ya tenes cuenta? ¡Inicia sesion! </Button>}
        />
        <Snackbar open={Boolean(errorSnackbar)} autoHideDuration={6000} onClose={handleCloseSnackbar}>
          <Alert severity="error" sx={{ width: '100%' }} onClose={handleCloseSnackbar}>
            {errorSnackbar}
          </Alert>
        </Snackbar>
      </Container>
    </Grid>
  )
}

export default Register