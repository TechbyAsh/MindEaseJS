import React from 'react';
import { TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import { theme } from '../theme/theme';

const CardContainer = styled.TouchableOpacity`
  background-color: ${props => props.backgroundColor || theme.colors.white};
  border-radius: ${props => props.radius || theme.borderRadius.lg}px;
  padding: ${props => props.padding || theme.spacing.md}px;
  margin-bottom: ${props => props.marginBottom || theme.spacing.md}px;
  margin-horizontal: ${props => props.marginHorizontal || 0}px;
  overflow: hidden;
  ${props => props.shadow ? theme.shadows.medium : ''}
`;

const Card = ({
  children,
  onPress,
  backgroundColor,
  radius,
  padding,
  marginBottom,
  marginHorizontal,
  shadow = true,
  style = {},
  ...props
}) => {
  if (onPress) {
    return (
      <CardContainer
        backgroundColor={backgroundColor}
        radius={radius}
        padding={padding}
        marginBottom={marginBottom}
        marginHorizontal={marginHorizontal}
        shadow={shadow}
        style={style}
        onPress={onPress}
        activeOpacity={0.8}
        {...props}
      >
        {children}
      </CardContainer>
    );
  }

  return (
    <CardContainer
      as={TouchableOpacity}
      activeOpacity={1}
      backgroundColor={backgroundColor}
      radius={radius}
      padding={padding}
      marginBottom={marginBottom}
      marginHorizontal={marginHorizontal}
      shadow={shadow}
      style={style}
      {...props}
    >
      {children}
    </CardContainer>
  );
};

export default Card;
