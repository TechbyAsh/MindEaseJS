import React from 'react';
import { TouchableOpacity, ActivityIndicator } from 'react-native';
import styled from 'styled-components/native';
import { theme } from '../theme/theme';

const ButtonContainer = styled.TouchableOpacity`
  background-color: ${props => 
    props.variant === 'outlined' 
      ? 'transparent' 
      : props.variant === 'secondary' 
        ? theme.colors.tertiary 
        : theme.colors.secondary};
  border-radius: ${props => props.rounded ? theme.borderRadius.round : theme.borderRadius.lg}px;
  padding: ${props => props.size === 'small' 
    ? `${theme.spacing.sm}px ${theme.spacing.md}px` 
    : props.size === 'large' 
      ? `${theme.spacing.lg}px ${theme.spacing.xl}px` 
      : `${theme.spacing.md}px ${theme.spacing.lg}px`};
  align-items: center;
  justify-content: center;
  flex-direction: row;
  border-width: ${props => props.variant === 'outlined' ? 1 : 0}px;
  border-color: ${theme.colors.secondary};
  opacity: ${props => props.disabled ? 0.6 : 1};
  elevation: ${props => props.variant === 'outlined' ? 0 : 2};
  shadow-opacity: ${props => props.variant === 'outlined' ? 0 : 0.15};
  shadow-radius: 3px;
  shadow-color: #000;
  shadow-offset: 0px 2px;
`;

const ButtonText = styled.Text`
  color: ${props => 
    props.variant === 'outlined' 
      ? theme.colors.secondary 
      : theme.colors.white};
  font-size: ${props => 
    props.size === 'small' 
      ? theme.typography.fontSize.sm 
      : props.size === 'large' 
        ? theme.typography.fontSize.lg 
        : theme.typography.fontSize.md}px;
  font-weight: ${theme.typography.fontWeight.semiBold};
  text-align: center;
  margin-left: ${props => props.iconPosition === 'left' ? theme.spacing.sm : 0}px;
  margin-right: ${props => props.iconPosition === 'right' ? theme.spacing.sm : 0}px;
`;

const Button = ({ 
  title, 
  onPress, 
  variant = 'primary', 
  size = 'medium', 
  disabled = false,
  loading = false,
  icon = null,
  iconPosition = 'left',
  rounded = false,
  style = {},
  ...props 
}) => {
  return (
    <ButtonContainer 
      onPress={onPress} 
      variant={variant}
      size={size}
      disabled={disabled || loading}
      rounded={rounded}
      style={style}
      activeOpacity={0.8}
      {...props}
    >
      {loading ? (
        <ActivityIndicator 
          size="small" 
          color={variant === 'outlined' ? theme.colors.secondary : theme.colors.white} 
        />
      ) : (
        <>
          {icon && iconPosition === 'left' && icon}
          {title && <ButtonText variant={variant} size={size} iconPosition={iconPosition}>{title}</ButtonText>}
          {icon && iconPosition === 'right' && icon}
        </>
      )}
    </ButtonContainer>
  );
};

export default Button;
