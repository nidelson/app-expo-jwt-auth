import axios from 'axios';

const API_URL = 'https://api.developbetterapps.com';

export const register = async (email: string, password: string) => {
  return await axios.post(`${API_URL}/users`, {
    email,
    password,
  });
};
