import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styled from 'styled-components/native';
import { theme } from '../theme/theme';

const TabBarContainer = styled.View`
  flex-direction: row;
  background-color: ${theme.colors.white};
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  padding-vertical: 10px;
  elevation: 10;
  shadow-opacity: 0.1;
  shadow-radius: 10px;
  shadow-color: #000;
  shadow-offset: 0px -2px;
`;

const TabButton = styled.TouchableOpacity`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding-vertical: 8px;
`;

const TabIcon = styled.View`
  width: 50px;
  height: 50px;
  border-radius: 25px;
  align-items: center;
  justify-content: center;
  background-color: ${props => props.focused ? theme.colors.secondary : 'transparent'};
`;

const TabLabel = styled.Text`
  font-size: 12px;
  margin-top: 4px;
  color: ${props => props.focused ? theme.colors.secondary : theme.colors.text.secondary};
  font-weight: ${props => props.focused ? theme.typography.fontWeight.semiBold : theme.typography.fontWeight.regular};
`;

// Special center button for SOS
const CenterButton = styled.TouchableOpacity`
  width: 60px;
  height: 60px;
  border-radius: 30px;
  background-color: ${theme.colors.error};
  align-items: center;
  justify-content: center;
  margin-top: -25px;
  elevation: 5;
  shadow-opacity: 0.2;
  shadow-radius: 5px;
  shadow-color: #000;
  shadow-offset: 0px 2px;
`;

const CustomTabBar = ({ state, descriptors, navigation }) => {
  return (
    <TabBarContainer>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label = options.tabBarLabel || options.title || route.name;
        const isFocused = state.index === index;

        let iconName;
        if (route.name === 'Home') {
          iconName = isFocused ? 'home' : 'home-outline';
        } else if (route.name === 'Meditation') {
          iconName = isFocused ? 'flower' : 'flower-outline';
        } else if (route.name === 'Breathing') {
          iconName = 'water';
        } else if (route.name === 'Community') {
          iconName = isFocused ? 'people' : 'people-outline';
        } else if (route.name === 'Profile') {
          iconName = isFocused ? 'person' : 'person-outline';
        }

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        // Special center button for Breathing exercises
        if (route.name === 'Breathing') {
          return (
            <View key={index} style={{ alignItems: 'center' }}>
              <CenterButton onPress={() => navigation.navigate('Breathing')}>
                <Ionicons name={iconName} size={28} color="white" />
              </CenterButton>
              <TabLabel focused={isFocused}>Breathe</TabLabel>
            </View>
          );
        }

        return (
          <TabButton
            key={index}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            onPress={onPress}
          >
            <TabIcon focused={isFocused}>
              <Ionicons 
                name={iconName} 
                size={24} 
                color={isFocused ? theme.colors.white : theme.colors.text.secondary} 
              />
            </TabIcon>
            <TabLabel focused={isFocused}>{label}</TabLabel>
          </TabButton>
        );
      })}
    </TabBarContainer>
  );
};

export default CustomTabBar;
