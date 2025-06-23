import React, { createContext, useState, useEffect, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Create the authentication context
const AuthContext = createContext();

// Custom hook to use the auth context
export const useAuth = () => {
  return useContext(AuthContext);
};

// Provider component that wraps the app and makes auth object available to any child component that calls useAuth()
export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [onboardingCompleted, setOnboardingCompleted] = useState(false);

  // Load stored user data when the provider mounts
  useEffect(() => {
    const loadStoredUser = async () => {
      try {
        // For development purposes, clear stored data to ensure auth flow
        await AsyncStorage.removeItem('userToken');
        await AsyncStorage.removeItem('userData');
        await AsyncStorage.removeItem('onboardingCompleted');
        
        const userToken = await AsyncStorage.getItem('userToken');
        const userDataString = await AsyncStorage.getItem('userData');
        const onboardingStatus = await AsyncStorage.getItem('onboardingCompleted');
        
        if (userToken && userDataString) {
          const userData = JSON.parse(userDataString);
          setCurrentUser(userData);
        } else {
          setCurrentUser(null);
        }
        
        setOnboardingCompleted(onboardingStatus === 'true');
        setLoading(false);
      } catch (error) {
        console.error('Error loading auth data:', error);
        setCurrentUser(null);
        setOnboardingCompleted(false);
        setLoading(false);
      }
    };

    loadStoredUser();
  }, []);

  // Sign up function
  const signup = async (name, email, password) => {
    try {
      // In a real app, you would make an API call to your backend here
      // For now, we'll simulate a successful signup
      const userData = { name, email, id: Date.now().toString() };
      
      // Store the user data in AsyncStorage
      await AsyncStorage.setItem('userToken', 'dummy-auth-token');
      await AsyncStorage.setItem('userData', JSON.stringify(userData));
      
      setCurrentUser(userData);
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  // Login function
  const login = async (email, password) => {
    try {
      // In a real app, you would make an API call to your backend here
      // For now, we'll simulate a successful login
      const userData = { name: 'User', email, id: Date.now().toString() };
      
      // Store the user data in AsyncStorage
      await AsyncStorage.setItem('userToken', 'dummy-auth-token');
      await AsyncStorage.setItem('userData', JSON.stringify(userData));
      
      setCurrentUser(userData);
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  // Logout function
  const logout = async () => {
    try {
      // Remove user data from AsyncStorage
      await AsyncStorage.removeItem('userToken');
      await AsyncStorage.removeItem('userData');
      
      setCurrentUser(null);
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  // Complete onboarding
  const completeOnboarding = async () => {
    try {
      await AsyncStorage.setItem('onboardingCompleted', 'true');
      setOnboardingCompleted(true);
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  // Reset password function
  const resetPassword = async (email) => {
    try {
      // In a real app, you would make an API call to your backend here
      // For now, we'll simulate a successful password reset request
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  // The value that will be provided to consumers of this context
  const value = {
    currentUser,
    loading,
    onboardingCompleted,
    signup,
    login,
    logout,
    resetPassword,
    completeOnboarding,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}
