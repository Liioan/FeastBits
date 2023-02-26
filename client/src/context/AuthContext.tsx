import { createContext, useContext, useState, useCallback } from 'react';
import { User } from '../types/user';

interface ContextProviderProps {
  children: JSX.Element;
}

interface ContextType {
  user: User | undefined;
  setLocalUser: (user: User) => void;
  resetUser: () => void;
}

const AuthContext = createContext<ContextType | null>(null);
const localStorageName = 'user';

export const useAuth = () => {
  return useContext(AuthContext);
};

const useLocalUser = () => {
  const [user, setUser] = useState<User>(() => {
    const currentUser = localStorage.getItem('user');
    if (!currentUser) return undefined;
    return JSON.parse(currentUser);
  });

  const setLocalUser = useCallback((user: User) => {
    setUser(user);
    localStorage.setItem(localStorageName, JSON.stringify(user));
  }, []);

  const resetUser = useCallback(() => {
    localStorage.removeItem(localStorageName);
  }, []);

  return { user, setLocalUser, resetUser };
};

export const AuthProvider = ({ children }: ContextProviderProps) => {
  const { user, setLocalUser, resetUser } = useLocalUser();

  return (
    <AuthContext.Provider
      value={{
        user,
        setLocalUser,
        resetUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
