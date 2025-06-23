import React from 'react';
import { View, Image } from 'react-native';
import styled from 'styled-components/native';
import { theme } from '../../theme/theme';
import Button from '../../components/Button';

const Container = styled.SafeAreaView`
  flex: 1;
  background-color: ${theme.colors.background};
`;

const Content = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: ${theme.spacing.xl}px;
`;

const LogoContainer = styled.View`
  align-items: center;
  margin-bottom: ${theme.spacing.xxl}px;
`;

const Logo = styled.Image`
  width: 120px;
  height: 120px;
  margin-bottom: ${theme.spacing.lg}px;
`;

const AppName = styled.Text`
  font-size: ${theme.typography.fontSize.xxxl}px;
  font-weight: ${theme.typography.fontWeight.bold};
  color: ${theme.colors.primary};
  margin-bottom: ${theme.spacing.sm}px;
`;

const Tagline = styled.Text`
  font-size: ${theme.typography.fontSize.lg}px;
  color: ${theme.colors.text.secondary};
  text-align: center;
  margin-bottom: ${theme.spacing.xxl}px;
`;

const ButtonContainer = styled.View`
  width: 100%;
  margin-bottom: ${theme.spacing.md}px;
`;

const Footer = styled.View`
  margin-top: ${theme.spacing.xl}px;
  align-items: center;
`;

const FooterText = styled.Text`
  font-size: ${theme.typography.fontSize.sm}px;
  color: ${theme.colors.text.secondary};
  margin-bottom: ${theme.spacing.sm}px;
`;

const TermsText = styled.Text`
  font-size: ${theme.typography.fontSize.xs}px;
  color: ${theme.colors.text.light};
  text-align: center;
  margin-top: ${theme.spacing.lg}px;
`;

const LinkText = styled.Text`
  color: ${theme.colors.secondary};
  text-decoration: underline;
`;

export default function WelcomeScreen({ navigation }) {
  return (
    <Container>
      <Content>
        <LogoContainer>
          <Logo source={require('../../../assets/images/icon.png')} />
          <AppName>MindEase</AppName>
          <Tagline>Your daily companion for mental wellness</Tagline>
        </LogoContainer>
        
        <ButtonContainer>
          <Button
            title="Get Started"
            variant="primary"
            size="large"
            onPress={() => navigation.navigate('Onboarding')}
          />
        </ButtonContainer>
        
        <ButtonContainer>
          <Button
            title="Log In"
            variant="outlined"
            size="large"
            onPress={() => navigation.navigate('Login')}
          />
        </ButtonContainer>
        
        <Footer>
          <FooterText>Don't have an account?</FooterText>
          <Button
            title="Sign Up"
            variant="text"
            onPress={() => navigation.navigate('Signup')}
          />
        </Footer>
        
        <TermsText>
          By continuing, you agree to our{' '}
          <LinkText>Terms of Service</LinkText> and{' '}
          <LinkText>Privacy Policy</LinkText>
        </TermsText>
      </Content>
    </Container>
  );
}
