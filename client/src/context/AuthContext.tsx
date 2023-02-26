import { createContext, useContext, useState, useCallback } from 'react';
import { User } from '../types/user';

interface ContextProviderProps {
  children: JSX.Element;
}

type Token = string | undefined;

interface ContextType {
  user: User | undefined;
  token: Token;
  setLocalUser: (user: User, token: Token) => void;
  resetUser: () => void;
}

const AuthContext = createContext<ContextType | null>(null);
const localStorageUser = 'user';
const localStorageToken = 'token';

export const useAuth = () => {
  return useContext(AuthContext);
};

const useLocalUser = () => {
  const [user, setUser] = useState<User>(() => {
    const currentUser = localStorage.getItem(localStorageUser);
    if (!currentUser) return undefined;
    return JSON.parse(currentUser);
  });

  const [token, setToken] = useState<Token>(() => {
    const currentToken = localStorage.getItem(localStorageToken);
    if (!currentToken) return undefined;
    return JSON.parse(currentToken);
  });

  const setLocalUser = useCallback((user: User, token: Token) => {
    setUser(user);
    setToken(token);
    localStorage.setItem(localStorageUser, JSON.stringify(user));
    localStorage.setItem(localStorageToken, JSON.stringify(token));
  }, []);

  const resetUser = useCallback(() => {
    localStorage.removeItem(localStorageUser);
    localStorage.removeItem(localStorageToken);
  }, []);

  return { user, setLocalUser, resetUser, token };
};

export const AuthProvider = ({ children }: ContextProviderProps) => {
  const { user, token, setLocalUser, resetUser } = useLocalUser();

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        setLocalUser,
        resetUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
