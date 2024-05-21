import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';
import { AxiosError } from 'axios';

import { register } from '../services/userService';
import { loadToken, login, logout } from '../services/authService';

interface AuthContextProps {
  authState: { token: string | null; autenticated: boolean };
  onRegister?: (email: string, password: string) => Promise<any>;
  onLogin?: (email: string, password: string) => Promise<any>;
  onLogout?: () => Promise<any>;
}

const AuthContext = createContext<AuthContextProps>({
  authState: {
    token: null,
    autenticated: false,
  },
});

export function useAuth() {
  const context = useContext(AuthContext);

  if (process.env.NODE_ENV !== 'production') {
    if (!context) {
      throw new Error('useAuth must be wrapped in a <AuthProvider />');
    }
  }

  return context;
}

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  console.log('AuthProvider');
  const [authState, setAuthState] = useState<AuthContextProps['authState']>({
    token: null,
    autenticated: false,
  });

  useEffect(() => {
    (async () => {
      const token = await loadToken();

      if (token) {
        setAuthState({
          token,
          autenticated: true,
        });
      }
    })();
  }, []);

  const onRegister = async (email: string, password: string) => {
    try {
      return await register(email, password);
    } catch (error) {
      return { error: true, message: (error as AxiosError).message };
    }
  };

  const onLogin = async (email: string, password: string) => {
    try {
      const response = await login(email, password);
      const authState = response as AuthContextProps['authState'];
      setAuthState(authState);

      return response;
    } catch (error) {
      return { error: true, message: (error as AxiosError).message };
    }
  };

  const onLogout = async () => {
    try {
      const response = await logout();
      setAuthState(response as AuthContextProps['authState']);

      return response;
    } catch (error) {
      return { error: true, message: (error as AxiosError).message };
    }
  };

  const value = { authState, onRegister, onLogin, onLogout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
