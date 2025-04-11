
import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, AuthState } from '@/types';
import { toast } from '@/components/ui/use-toast';

// Mock users database
const MOCK_USERS: User[] = [
  {
    id: '1',
    username: 'admin',
    email: 'admin@train.com',
  },
  {
    id: '2',
    username: 'user',
    email: 'user@train.com',
  }
];

// Mock user storage
const mockStorage = {
  getItem: (key: string) => {
    const storedData = localStorage.getItem(key);
    return storedData ? JSON.parse(storedData) : null;
  },
  setItem: (key: string, value: unknown) => {
    localStorage.setItem(key, JSON.stringify(value));
  },
  removeItem: (key: string) => {
    localStorage.removeItem(key);
  }
};

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<void>;
  signup: (username: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: true,
    error: null,
  });

  useEffect(() => {
    // Check if user is already logged in
    const storedUser = mockStorage.getItem('user');
    if (storedUser) {
      setAuthState({
        user: storedUser,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      });
    } else {
      setAuthState(prevState => ({
        ...prevState,
        isLoading: false,
      }));
    }
  }, []);

  const login = async (email: string, password: string) => {
    try {
      // For demo purposes, we'll mock the authentication
      // In a real app, this would make an API call to your backend
      
      // Simple validation
      if (!email || !password) {
        throw new Error('Please enter both email and password');
      }

      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Find user (for demo, password is not validated, just email)
      const user = MOCK_USERS.find(u => u.email === email);
      
      if (!user) {
        throw new Error('Invalid email or password');
      }
      
      // Set user in local storage
      mockStorage.setItem('user', user);
      
      // Update auth state
      setAuthState({
        user,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      });
      
      toast({
        title: 'Login successful',
        description: `Welcome back, ${user.username}!`,
      });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Login failed';
      setAuthState(prevState => ({
        ...prevState,
        error: errorMessage,
        isLoading: false,
      }));
      
      toast({
        title: 'Login failed',
        description: errorMessage,
        variant: 'destructive',
      });
    }
  };

  const signup = async (username: string, email: string, password: string) => {
    try {
      // For demo purposes, we'll mock the signup
      // In a real app, this would make an API call to your backend
      
      // Simple validation
      if (!username || !email || !password) {
        throw new Error('Please fill in all fields');
      }
      
      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        throw new Error('Please enter a valid email address');
      }
      
      // Check if user already exists
      const existingUser = MOCK_USERS.find(u => u.email === email);
      if (existingUser) {
        throw new Error('Email already in use');
      }
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Create new user
      const newUser: User = {
        id: (MOCK_USERS.length + 1).toString(),
        username,
        email,
      };
      
      // Add to mock database
      MOCK_USERS.push(newUser);
      
      // Set user in local storage
      mockStorage.setItem('user', newUser);
      
      // Update auth state
      setAuthState({
        user: newUser,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      });
      
      toast({
        title: 'Signup successful',
        description: `Welcome, ${username}!`,
      });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Signup failed';
      setAuthState(prevState => ({
        ...prevState,
        error: errorMessage,
        isLoading: false,
      }));
      
      toast({
        title: 'Signup failed',
        description: errorMessage,
        variant: 'destructive',
      });
    }
  };

  const logout = () => {
    // Remove user from local storage
    mockStorage.removeItem('user');
    
    // Update auth state
    setAuthState({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,
    });
    
    toast({
      title: 'Logged out',
      description: 'You have been successfully logged out.',
    });
  };

  return (
    <AuthContext.Provider
      value={{
        ...authState,
        login,
        signup,
        logout,
      }}
    >
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
