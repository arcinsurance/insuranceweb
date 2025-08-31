import React, { createContext, useState, useContext, ReactNode } from 'react';

// For this example, passwords are hardcoded. In a real application,
// this would be handled by a secure authentication service.
const ADMIN_PASSWORD = "adminpass123";
const AGENT_PASSWORD = "password123";

type UserRole = 'admin' | 'agent';

interface User {
  isAuthenticated: boolean;
  role: UserRole | null;
}

interface AuthContextType {
  user: User;
  login: (password: string) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User>(() => {
    try {
        const storedUser = sessionStorage.getItem('user');
        if (storedUser) {
            return JSON.parse(storedUser);
        }
    } catch (e) {
        console.error("Could not parse user from session storage", e);
    }
    return { isAuthenticated: false, role: null };
  });

  const login = (password: string): boolean => {
    let role: UserRole | null = null;
    if (password === ADMIN_PASSWORD) {
        role = 'admin';
    } else if (password === AGENT_PASSWORD) {
        role = 'agent';
    }
    
    if (role) {
      const newUser = { isAuthenticated: true, role };
      sessionStorage.setItem('user', JSON.stringify(newUser));
      setUser(newUser);
      return true;
    }
    return false;
  };

  const logout = () => {
    sessionStorage.removeItem('user');
    setUser({ isAuthenticated: false, role: null });
  };

  const value = {
    user,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};