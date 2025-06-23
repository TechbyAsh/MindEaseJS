import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';

// Import navigators
import AuthNavigator from './AuthNavigator';
import AppNavigator from '../../app/navigation/AppNavigator';

// Import auth context
import { useAuth } from '../context/AuthContext';

const Stack = createStackNavigator();

export default function RootNavigator() {
  const { currentUser, loading, onboardingCompleted } = useAuth();

  if (loading) {
    // You could return a splash screen here
    return null;
  }

  return (
    <NavigationContainer>
      <StatusBar style="dark" />
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {currentUser ? (
          // User is authenticated, show main app
          <Stack.Screen name="App" component={AppNavigator} />
        ) : (
          // User is not authenticated, show auth flow
          <Stack.Screen name="Auth" component={AuthNavigator} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
