import { Box, Button, Grid, Input, Skeleton, Typography } from '@mui/material';
import { colors } from '../assets/colors';
import Container from '../components/general/container/Container';
import { useEffect, useState } from 'react';
import { ApiClient } from '../api/apiClient';
import Loader from '../components/general/Loader/Loader';

const Interview = () => {
  const [historyChat, setHistoryChat] = useState<any[] | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [initialLoader, setInitialLoader] = useState(true)
  const [endInterview, setEndInterview] = useState(false);
  const [userResponse, setUserResponse] = useState('');
  const apiClient = new ApiClient();
  const userEmail = localStorage.getItem("userEmail");

  const handleInterview = async (chat: any) => {
    setIsLoading(true);
    try {
      const { data: { respuestaIA } } = await apiClient.startChat(chat, endInterview, userEmail);
      setHistoryChat(respuestaIA);
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false);
      setInitialLoader(false);
    }
  };

  useEffect(() => {
    handleInterview(historyChat);
  }, [endInterview])

  const handleSendResponse = () => {
    if (userResponse.trim() !== '') {
      const updatedChat = [...(historyChat || []), { role: 'user', content: userResponse }];
      setHistoryChat(updatedChat);
      setUserResponse('');
      handleInterview(updatedChat);
    }
  }


  const createChat = () => {
    if (historyChat && !endInterview) {
      const chatSubset = historyChat.slice(2);
      return chatSubset?.map((chat, index) => (
        <Box key={index} style={{ marginRight: chat.role === 'system' ? '5rem' : 0, marginLeft: chat.role !== 'system' ? '5rem' : 0 }}>
          <Container>
            <Typography variant="body1">
              {chat.content}
            </Typography>
          </Container>
        </Box>
      ))
    } else {
      return (
        <Box minHeight={"50vh"}>
          <Typography variant="h4" mt={6} color={colors.blanco}>
            Gracias por haber completado la entrevista con RecruitFlow
          </Typography>
        </Box>
      )
    }
  };

  return (
    <Grid container display={"flex"} flexDirection={"column"} alignItems={"center"} sx={{ minHeight: '100vh', background: colors.negro }}>
      <Typography variant="h2" mt={6} color={colors.blanco}>
        Bienvenido a RecruitFlow
      </Typography>
      <Box display={"flex"} flexDirection={"column"} marginY={3} gap={3}>
        {initialLoader ? <Loader /> : createChat()}
        {isLoading && !initialLoader &&
          <Box display={"flex"} justifyContent={"center"} >
            <Skeleton variant="circular" width={50} height={50} style={{ backgroundColor: colors.grisClaro }} />
          </Box>
        }
        <Box display="flex" flexDirection="column" alignItems="center" gap={2}>
          <Input
            value={userResponse}
            onChange={(e) => setUserResponse(e.target.value)}
            placeholder="Tu respuesta..."
            sx={{ width: 300, backgroundColor: colors.blanco }}
          />
          <Button variant="contained" style={{ backgroundColor: colors.verdeEsperanza }} onClick={handleSendResponse}>
            Enviar Respuesta
          </Button>
          <Button variant="contained" style={{ backgroundColor: colors.azulProfundo }} onClick={() => {
            setEndInterview(true);
            setInitialLoader(true);
            handleInterview(historyChat);
          }}>
            Finalizar Entrevista
          </Button>
        </Box>
      </Box>
    </Grid>
  )
}

export default Interview