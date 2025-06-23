import React, { useState } from 'react';
import { View, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styled from 'styled-components/native';
import { theme } from '../../theme/theme';
import Button from '../../components/Button';
import { useAuth } from '../../context/AuthContext';

const Container = styled.SafeAreaView`
  flex: 1;
  background-color: ${theme.colors.background};
`;

const Content = styled.View`
  flex: 1;
  padding: ${theme.spacing.xl}px;
`;

const Header = styled.View`
  margin-bottom: ${theme.spacing.xxl}px;
`;

const BackButton = styled.TouchableOpacity`
  margin-bottom: ${theme.spacing.xl}px;
`;

const Title = styled.Text`
  font-size: ${theme.typography.fontSize.xxl}px;
  font-weight: ${theme.typography.fontWeight.bold};
  color: ${theme.colors.text.primary};
  margin-bottom: ${theme.spacing.sm}px;
`;

const Subtitle = styled.Text`
  font-size: ${theme.typography.fontSize.md}px;
  color: ${theme.colors.text.secondary};
`;

const FormContainer = styled.View`
  margin-bottom: ${theme.spacing.xl}px;
`;

const InputLabel = styled.Text`
  font-size: ${theme.typography.fontSize.sm}px;
  font-weight: ${theme.typography.fontWeight.medium};
  color: ${theme.colors.text.primary};
  margin-bottom: ${theme.spacing.xs}px;
`;

const InputContainer = styled.View`
  flex-direction: row;
  align-items: center;
  background-color: ${theme.colors.white};
  border-radius: ${theme.borderRadius.md}px;
  padding: ${theme.spacing.md}px;
  margin-bottom: ${theme.spacing.lg}px;
  border-width: 1px;
  border-color: ${props => props.error ? theme.colors.error : theme.colors.gray.light};
  ${theme.shadows.small}
`;

const Input = styled.TextInput`
  flex: 1;
  font-size: ${theme.typography.fontSize.md}px;
  color: ${theme.colors.text.primary};
`;

const PasswordToggle = styled.TouchableOpacity`
  padding: ${theme.spacing.xs}px;
`;

const ErrorText = styled.Text`
  font-size: ${theme.typography.fontSize.sm}px;
  color: ${theme.colors.error};
  margin-top: -${theme.spacing.md}px;
  margin-bottom: ${theme.spacing.md}px;
  margin-left: ${theme.spacing.xs}px;
`;

const ForgotPasswordContainer = styled.View`
  align-items: flex-end;
  margin-bottom: ${theme.spacing.xl}px;
`;

const SocialLoginContainer = styled.View`
  margin-top: ${theme.spacing.xl}px;
`;

const OrContainer = styled.View`
  flex-direction: row;
  align-items: center;
  margin: ${theme.spacing.lg}px 0;
`;

const Line = styled.View`
  flex: 1;
  height: 1px;
  background-color: ${theme.colors.gray.light};
`;

const OrText = styled.Text`
  font-size: ${theme.typography.fontSize.sm}px;
  color: ${theme.colors.text.secondary};
  margin: 0 ${theme.spacing.md}px;
`;

const SocialButtonsContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

const SocialButton = styled.TouchableOpacity`
  flex: 1;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background-color: ${theme.colors.white};
  border-radius: ${theme.borderRadius.md}px;
  padding: ${theme.spacing.md}px;
  margin: 0 ${theme.spacing.xs}px;
  ${theme.shadows.small}
`;

const SocialButtonText = styled.Text`
  font-size: ${theme.typography.fontSize.sm}px;
  color: ${theme.colors.text.primary};
  margin-left: ${theme.spacing.xs}px;
`;

const Footer = styled.View`
  flex-direction: row;
  justify-content: center;
  margin-top: ${theme.spacing.xl}px;
`;

const FooterText = styled.Text`
  font-size: ${theme.typography.fontSize.sm}px;
  color: ${theme.colors.text.secondary};
`;

const SignupLink = styled.TouchableOpacity`
  margin-left: ${theme.spacing.xs}px;
`;

const SignupText = styled.Text`
  font-size: ${theme.typography.fontSize.sm}px;
  color: ${theme.colors.secondary};
  font-weight: ${theme.typography.fontWeight.semiBold};
`;

export default function LoginScreen({ navigation }) {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      setEmailError('Email is required');
      return false;
    } else if (!emailRegex.test(email)) {
      setEmailError('Please enter a valid email');
      return false;
    }
    setEmailError('');
    return true;
  };

  const validatePassword = (password) => {
    if (!password) {
      setPasswordError('Password is required');
      return false;
    } else if (password.length < 6) {
      setPasswordError('Password must be at least 6 characters');
      return false;
    }
    setPasswordError('');
    return true;
  };

  const handleLogin = async () => {
    const isEmailValid = validateEmail(email);
    const isPasswordValid = validatePassword(password);

    if (isEmailValid && isPasswordValid) {
      setIsLoading(true);
      try {
        const result = await login(email, password);
        if (result.success) {
          // Login successful, navigation will be handled by RootNavigator
        } else {
          Alert.alert('Login Failed', result.error || 'Please check your credentials and try again.');
        }
      } catch (error) {
        Alert.alert('Login Error', 'An unexpected error occurred. Please try again.');
        console.error('Login error:', error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <Container>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView showsVerticalScrollIndicator={false}>
          <Content>
            <Header>
              <BackButton onPress={() => navigation.goBack()}>
                <Ionicons name="arrow-back" size={24} color={theme.colors.text.primary} />
              </BackButton>
              <Title>Welcome back</Title>
              <Subtitle>Log in to continue your journey</Subtitle>
            </Header>

            <FormContainer>
              <InputLabel>Email</InputLabel>
              <InputContainer error={!!emailError}>
                <Ionicons name="mail-outline" size={20} color={theme.colors.text.light} />
                <Input
                  placeholder="Enter your email"
                  placeholderTextColor={theme.colors.text.light}
                  value={email}
                  onChangeText={(text) => {
                    setEmail(text);
                    if (emailError) validateEmail(text);
                  }}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  style={{ marginLeft: theme.spacing.sm }}
                />
              </InputContainer>
              {emailError ? <ErrorText>{emailError}</ErrorText> : null}

              <InputLabel>Password</InputLabel>
              <InputContainer error={!!passwordError}>
                <Ionicons name="lock-closed-outline" size={20} color={theme.colors.text.light} />
                <Input
                  placeholder="Enter your password"
                  placeholderTextColor={theme.colors.text.light}
                  value={password}
                  onChangeText={(text) => {
                    setPassword(text);
                    if (passwordError) validatePassword(text);
                  }}
                  secureTextEntry={!showPassword}
                  autoCapitalize="none"
                  style={{ marginLeft: theme.spacing.sm }}
                />
                <PasswordToggle onPress={() => setShowPassword(!showPassword)}>
                  <Ionicons
                    name={showPassword ? 'eye-off-outline' : 'eye-outline'}
                    size={20}
                    color={theme.colors.text.light}
                  />
                </PasswordToggle>
              </InputContainer>
              {passwordError ? <ErrorText>{passwordError}</ErrorText> : null}
            </FormContainer>

            <ForgotPasswordContainer>
              <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
                <Subtitle>Forgot password?</Subtitle>
              </TouchableOpacity>
            </ForgotPasswordContainer>

            <Button
              title="Log In"
              variant="primary"
              size="large"
              onPress={handleLogin}
              loading={isLoading}
              disabled={isLoading}
            />

            <SocialLoginContainer>
              <OrContainer>
                <Line />
                <OrText>OR</OrText>
                <Line />
              </OrContainer>

              <SocialButtonsContainer>
                <SocialButton style={{ marginRight: theme.spacing.sm }}>
                  <Ionicons name="logo-google" size={20} color="#DB4437" />
                  <SocialButtonText>Google</SocialButtonText>
                </SocialButton>
                <SocialButton style={{ marginLeft: theme.spacing.sm }}>
                  <Ionicons name="logo-apple" size={20} color="#000000" />
                  <SocialButtonText>Apple</SocialButtonText>
                </SocialButton>
              </SocialButtonsContainer>
            </SocialLoginContainer>

            <Footer>
              <FooterText>Don't have an account?</FooterText>
              <SignupLink onPress={() => navigation.navigate('Signup')}>
                <SignupText>Sign Up</SignupText>
              </SignupLink>
            </Footer>
          </Content>
        </ScrollView>
      </KeyboardAvoidingView>
    </Container>
  );
}
