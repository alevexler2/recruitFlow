import axios, { AxiosInstance, AxiosResponse } from 'axios';

export class ApiClient {
  client: AxiosInstance;

  constructor() {
    const token = localStorage.getItem('userToken');
    this.client = axios.create({
      baseURL: import.meta.env.VITE_API_URL_PRODUCCION,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  };

  async createUser(name: string, lastName: string, email: string, password: string): Promise<AxiosResponse> {
    const url = '/users';

    try {
      const response = await this.client.post(url, {
        name,
        lastName,
        email,
        password,
      });

      return response;
    } catch (error) {
      throw error;
    }
  };

  async startChat(historyChat: any[] | undefined, endInterview: boolean, userEmail: string | null): Promise<AxiosResponse> {
    const url = '/interviews';
    try {
      const response = await this.client.post(url, {
        historyChat,
        endInterview,
        userEmail,
      });
      return response;
    } catch (error) {
      throw error;
    }
  }

}

export default ApiClient;