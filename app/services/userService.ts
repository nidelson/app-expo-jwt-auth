import axios from 'axios';

const TOKEN_KEY = 'token';
export const API_URL = 'https://api.developerbetterapps.com';

export const register = async (email: string, password: string) => {
  try {
    return await axios.post(`${API_URL}/users`, {
      email,
      password,
    });
  } catch (error) {
    console.log(error);

    return { error: true, message: (error as any).response.data.message };
  }
};
