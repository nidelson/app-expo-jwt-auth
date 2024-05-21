import axios from 'axios';
import * as SecureStore from 'expo-secure-store';

const TOKEN_KEY = 'app-token';
export const API_URL = 'https://api.developbetterapps.com';

export const loadToken = async () => {
  const token = await SecureStore.getItemAsync(TOKEN_KEY);
  console.log({ token });

  if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }

  return token;
};

export const login = async (email: string, password: string) => {
  try {
    const response = await axios.post(`${API_URL}/auth`, {
      email,
      password,
    });

    axios.defaults.headers.common[
      'Authorization'
    ] = `Bearer ${response.data.token}`;

    await SecureStore.setItemAsync(TOKEN_KEY, response.data.token);

    return {
      token: response.data.token,
      autenticated: true,
    };
  } catch (error) {
    throw error;
  }
};

export const logout = async () => {
  // Delete token from secure storage
  await SecureStore.deleteItemAsync(TOKEN_KEY);

  // Update HTTP Headers
  axios.defaults.headers.common['Authorization'] = '';

  return {
    token: null,
    autenticated: false,
  };
};
