import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';

// Import screens
import HomeScreen from '../../src/screens/HomeScreen';
import MeditationScreen from '../../src/screens/MeditationScreen';
import BreathingScreen from '../../src/screens/BreathingScreen';
import JournalScreen from '../../src/screens/CommunityScreen';
import ProfileScreen from '../../src/screens/ProfileScreen';
import SOSScreen from '../../src/screens/SOSScreen';

// Import custom components
import CustomTabBar from '../../src/components/CustomTabBar';
import { theme } from '../../src/theme/theme';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function HomeTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
      }}
      tabBar={props => <CustomTabBar {...props} />}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Meditation" component={MeditationScreen} />
      <Tab.Screen name="Breathing" component={BreathingScreen} />
      <Tab.Screen name="Journal" component={JournalScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

export default function AppNavigator() {
  return (
    <Stack.Navigator 
      screenOptions={{ 
        headerShown: false,
        cardStyle: { backgroundColor: theme.colors.background }
      }}
    >
        <Stack.Screen name="Main" component={HomeTabs} />
        <Stack.Screen 
          name="SOS" 
          component={SOSScreen} 
          options={{ 
            headerShown: true,
            title: 'SOS Calm Down',
            headerStyle: {
              backgroundColor: theme.colors.secondary,
            },
            headerTintColor: theme.colors.white,
          }} 
        />
      </Stack.Navigator>
  );
}
