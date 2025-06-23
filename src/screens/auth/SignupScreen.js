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
  margin-bottom: ${theme.spacing.xl}px;
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
  margin-bottom: ${theme.spacing.lg}px;
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
  margin-left: ${theme.spacing.sm}px;
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

const TermsContainer = styled.View`
  flex-direction: row;
  align-items: flex-start;
  margin-bottom: ${theme.spacing.xl}px;
`;

const CheckboxContainer = styled.TouchableOpacity`
  width: 24px;
  height: 24px;
  border-radius: ${theme.borderRadius.sm}px;
  border-width: 2px;
  border-color: ${props => props.checked ? theme.colors.secondary : theme.colors.gray.medium};
  background-color: ${props => props.checked ? theme.colors.secondary : 'transparent'};
  align-items: center;
  justify-content: center;
  margin-right: ${theme.spacing.sm}px;
  margin-top: 2px;
`;

const TermsText = styled.Text`
  flex: 1;
  font-size: ${theme.typography.fontSize.sm}px;
  color: ${theme.colors.text.secondary};
  line-height: 20px;
`;

const LinkText = styled.Text`
  color: ${theme.colors.secondary};
`;

const SocialLoginContainer = styled.View`
  margin-top: ${theme.spacing.lg}px;
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

const LoginLink = styled.TouchableOpacity`
  margin-left: ${theme.spacing.xs}px;
`;

const LoginText = styled.Text`
  font-size: ${theme.typography.fontSize.sm}px;
  color: ${theme.colors.secondary};
  font-weight: ${theme.typography.fontWeight.semiBold};
`;

export default function SignupScreen({ navigation }) {
  const { signup } = useAuth();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [termsError, setTermsError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const validateName = (name) => {
    if (!name.trim()) {
      setNameError('Name is required');
      return false;
    }
    setNameError('');
    return true;
  };

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

  const validateTerms = () => {
    if (!termsAccepted) {
      setTermsError('You must accept the Terms and Privacy Policy');
      return false;
    }
    setTermsError('');
    return true;
  };

  const handleSignup = async () => {
    const isNameValid = validateName(fullName);
    const isEmailValid = validateEmail(email);
    const isPasswordValid = validatePassword(password);
    const isTermsValid = validateTerms();

    if (isNameValid && isEmailValid && isPasswordValid && isTermsValid) {
      setIsLoading(true);
      try {
        const result = await signup(fullName, email, password);
        if (result.success) {
          // Signup successful, navigation will be handled by RootNavigator
        } else {
          Alert.alert('Signup Failed', result.error || 'Please check your information and try again.');
        }
      } catch (error) {
        Alert.alert('Signup Error', 'An unexpected error occurred. Please try again.');
        console.error('Signup error:', error);
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
              <Title>Create Account</Title>
              <Subtitle>Sign up to start your wellness journey</Subtitle>
            </Header>

            <FormContainer>
              <InputLabel>Full Name</InputLabel>
              <InputContainer error={!!nameError}>
                <Ionicons name="person-outline" size={20} color={theme.colors.text.light} />
                <Input
                  placeholder="Enter your full name"
                  placeholderTextColor={theme.colors.text.light}
                  value={fullName}
                  onChangeText={(text) => {
                    setFullName(text);
                    if (nameError) validateName(text);
                  }}
                  autoCapitalize="words"
                />
              </InputContainer>
              {nameError ? <ErrorText>{nameError}</ErrorText> : null}

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
                />
              </InputContainer>
              {emailError ? <ErrorText>{emailError}</ErrorText> : null}

              <InputLabel>Password</InputLabel>
              <InputContainer error={!!passwordError}>
                <Ionicons name="lock-closed-outline" size={20} color={theme.colors.text.light} />
                <Input
                  placeholder="Create a password"
                  placeholderTextColor={theme.colors.text.light}
                  value={password}
                  onChangeText={(text) => {
                    setPassword(text);
                    if (passwordError) validatePassword(text);
                  }}
                  secureTextEntry={!showPassword}
                  autoCapitalize="none"
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

              <TermsContainer>
                <CheckboxContainer
                  checked={termsAccepted}
                  onPress={() => setTermsAccepted(!termsAccepted)}
                >
                  {termsAccepted && <Ionicons name="checkmark" size={16} color="white" />}
                </CheckboxContainer>
                <TermsText>
                  I agree to the <LinkText>Terms of Service</LinkText> and <LinkText>Privacy Policy</LinkText>
                </TermsText>
              </TermsContainer>
              {termsError ? <ErrorText>{termsError}</ErrorText> : null}
            </FormContainer>

            <Button
              title="Sign Up"
              variant="primary"
              size="large"
              onPress={handleSignup}
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
              <FooterText>Already have an account?</FooterText>
              <LoginLink onPress={() => navigation.navigate('Login')}>
                <LoginText>Log In</LoginText>
              </LoginLink>
            </Footer>
          </Content>
        </ScrollView>
      </KeyboardAvoidingView>
    </Container>
  );
}
