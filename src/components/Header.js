import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styled from 'styled-components/native';
import { theme } from '../theme/theme';

const HeaderContainer = styled.View`
  padding: ${theme.spacing.lg}px;
  padding-bottom: ${props => props.withSubtitle ? theme.spacing.md : theme.spacing.lg}px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const TitleContainer = styled.View`
  flex: 1;
`;

const Title = styled.Text`
  font-size: ${props => props.large ? theme.typography.fontSize.xxl : theme.typography.fontSize.xl}px;
  font-weight: ${theme.typography.fontWeight.bold};
  color: ${theme.colors.text.primary};
  margin-bottom: ${props => props.withSubtitle ? theme.spacing.xs : 0}px;
`;

const Subtitle = styled.Text`
  font-size: ${theme.typography.fontSize.md}px;
  color: ${theme.colors.text.secondary};
`;

const IconButton = styled.TouchableOpacity`
  width: 40px;
  height: 40px;
  border-radius: ${theme.borderRadius.round}px;
  background-color: ${props => props.background || 'transparent'};
  align-items: center;
  justify-content: center;
  margin-left: ${theme.spacing.sm}px;
`;

const Header = ({
  title,
  subtitle,
  large = false,
  leftIcon,
  onLeftPress,
  rightIcon,
  onRightPress,
  secondRightIcon,
  onSecondRightPress,
  style = {},
}) => {
  return (
    <HeaderContainer withSubtitle={!!subtitle} style={style}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        {leftIcon && (
          <IconButton onPress={onLeftPress} style={{ marginLeft: 0, marginRight: theme.spacing.sm }}>
            <Ionicons name={leftIcon} size={24} color={theme.colors.text.primary} />
          </IconButton>
        )}
        
        <TitleContainer>
          <Title large={large} withSubtitle={!!subtitle}>{title}</Title>
          {subtitle && <Subtitle>{subtitle}</Subtitle>}
        </TitleContainer>
      </View>
      
      <View style={{ flexDirection: 'row' }}>
        {secondRightIcon && (
          <IconButton onPress={onSecondRightPress} background={theme.colors.gray.light}>
            <Ionicons name={secondRightIcon} size={22} color={theme.colors.text.primary} />
          </IconButton>
        )}
        
        {rightIcon && (
          <IconButton onPress={onRightPress} background={theme.colors.gray.light}>
            <Ionicons name={rightIcon} size={22} color={theme.colors.text.primary} />
          </IconButton>
        )}
      </View>
    </HeaderContainer>
  );
};

export default Header;
