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
  line-height: 22px;
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
  margin-left: ${theme.spacing.sm}px;
`;

const ErrorText = styled.Text`
  font-size: ${theme.typography.fontSize.sm}px;
  color: ${theme.colors.error};
  margin-top: -${theme.spacing.md}px;
  margin-bottom: ${theme.spacing.md}px;
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

export default function ForgotPasswordScreen({ navigation }) {
  const { resetPassword } = useAuth();
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [resetSent, setResetSent] = useState(false);
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

  const handleResetPassword = async () => {
    const isEmailValid = validateEmail(email);

    if (isEmailValid) {
      setIsLoading(true);
      try {
        const result = await resetPassword(email);
        if (result.success) {
          setResetSent(true);
        } else {
          Alert.alert('Reset Failed', result.error || 'Please check your email and try again.');
        }
      } catch (error) {
        Alert.alert('Reset Error', 'An unexpected error occurred. Please try again.');
        console.error('Password reset error:', error);
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
              <Title>Forgot Password?</Title>
              <Subtitle>
                Enter the email address associated with your account and we'll send you a link to reset your password.
              </Subtitle>
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
                />
              </InputContainer>
              {emailError ? <ErrorText>{emailError}</ErrorText> : null}
            </FormContainer>

            <Button
              title="Reset Password"
              variant="primary"
              size="large"
              onPress={handleResetPassword}
              loading={isLoading}
              disabled={isLoading}
            />

            <Footer>
              <FooterText>Remember your password?</FooterText>
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
