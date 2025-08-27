import React, { useState, useRef, useEffect } from 'react';
import { View, FlatList, Dimensions, TouchableOpacity, Animated, StatusBar } from 'react-native';
import styled from 'styled-components/native';
import { theme } from '../../theme/theme';
import Button from '../../components/Button';
import { useAuth } from '../../context/AuthContext';
import { Ionicons } from '@expo/vector-icons';
import LottieView from 'lottie-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width } = Dimensions.get('window');

import { LinearGradient } from 'expo-linear-gradient';

const Container = styled.SafeAreaView`
  flex: 1;
  background-color: ${theme.colors.background};
`;

const GradientBackground = styled(LinearGradient)`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
`;

const SlideContainer = styled.View`
  width: ${width}px;
  align-items: center;
  padding: ${theme.spacing.xl}px;
  justify-content: center;
  flex: 1;
`;

const ImageContainer = styled.View`
  width: 250px;
  height: 250px;
  margin-bottom: ${theme.spacing.xl}px;
  margin-top: ${theme.spacing.xl}px;
  align-items: center;
  justify-content: center;
`;

const SlideTitle = styled.Text`
  font-size: ${theme.typography.fontSize.xxl}px;
  font-weight: ${theme.typography.fontWeight.bold};
  color: ${props => props.color || theme.colors.white};
  text-align: center;
  margin-bottom: ${theme.spacing.md}px;
`;

const SlideText = styled.Text`
  font-size: ${theme.typography.fontSize.md}px;
  color: ${props => props.color || theme.colors.white};
  text-align: center;
  margin-bottom: ${theme.spacing.xxl}px;
  line-height: 24px;
  opacity: 0.9;
`;

const PaginationContainer = styled.View`
  flex-direction: row;
  justify-content: center;
  margin-top: ${theme.spacing.xl}px;
  margin-bottom: ${theme.spacing.xl}px;
`;

const PaginationDot = styled.View`
  width: 10px;
  height: 10px;
  border-radius: 5px;
  background-color: ${props => props.active ? theme.colors.white : 'rgba(255, 255, 255, 0.5)'};
  margin: 0 ${theme.spacing.xs}px;
`;

const ButtonContainer = styled.View`
  width: 100%;
  padding: ${theme.spacing.lg}px;
  position: absolute;
  bottom: 0;
  flex-direction: row;
  justify-content: space-between;
`;

const SkipButton = styled.TouchableOpacity`
  position: absolute;
  top: ${theme.spacing.lg}px;
  right: ${theme.spacing.lg}px;
  padding: ${theme.spacing.sm}px;
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: ${theme.borderRadius.lg}px;
`;

const SkipText = styled.Text`
  color: ${theme.colors.white};
  font-size: ${theme.typography.fontSize.md}px;
  padding: ${theme.spacing.xs}px ${theme.spacing.sm}px;
`;

const PreferenceContainer = styled.View`
  width: 100%;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: ${theme.spacing.lg}px;
`;

const PreferenceOption = styled.TouchableOpacity`
  background-color: ${props => props.selected ? 'rgba(255, 255, 255, 0.3)' : 'rgba(255, 255, 255, 0.15)'};
  padding: ${theme.spacing.md}px ${theme.spacing.lg}px;
  border-radius: ${theme.borderRadius.lg}px;
  margin: ${theme.spacing.sm}px;
  min-width: 120px;
  align-items: center;
`;

const PreferenceText = styled.Text`
  color: ${theme.colors.white};
  font-size: ${theme.typography.fontSize.md}px;
  font-weight: ${props => props.selected ? theme.typography.fontWeight.bold : theme.typography.fontWeight.medium};
`;

const InputContainer = styled.View`
  width: 100%;
  margin-top: ${theme.spacing.lg}px;
`;

const Input = styled.TextInput`
  background-color: rgba(255, 255, 255, 0.2);
  padding: ${theme.spacing.md}px;
  border-radius: ${theme.borderRadius.md}px;
  color: ${theme.colors.white};
  font-size: ${theme.typography.fontSize.md}px;
  width: 100%;
  margin-bottom: ${theme.spacing.md}px;
`;

// Define the slides for the onboarding flow
const introSlides = [
  {
    id: '1',
    type: 'intro',
    title: 'Welcome to MindEase',
    text: 'Your journey to mental wellness starts here. Let us help you create a personalized experience.',
    animationSource: require('../../../assets/images/onboarding/Animation - 1750725331350.json'),
    gradientColors: ['#4c669f', '#3b5998', '#192f6a']
  },
  {
    id: '2',
    type: 'intro',
    title: 'Personalized Guidance',
    text: 'Get tailored recommendations and exercises based on your specific needs and goals.',
    animationSource: require('../../../assets/images/onboarding/Animation - 1750725331350.json'),
    gradientColors: ['#6a3093', '#a044ff', '#6a3093']
  }
];

const questionSlides = [
  {
    id: '3',
    type: 'question',
    title: 'What brings you to MindEase?',
    text: 'Select all that apply to customize your experience.',
    options: [
      { id: 'stress', label: 'Reduce Stress' },
      { id: 'anxiety', label: 'Manage Anxiety' },
      { id: 'sleep', label: 'Better Sleep' },
      { id: 'focus', label: 'Improve Focus' },
      { id: 'mood', label: 'Boost Mood' },
      { id: 'growth', label: 'Personal Growth' }
    ],
    gradientColors: ['#00c6ff', '#0072ff', '#0046ff']
  },
  {
    id: '4',
    type: 'question',
    title: 'How often do you practice mindfulness?',
    text: 'This helps us tailor content to your experience level.',
    options: [
      { id: 'never', label: 'Never tried' },
      { id: 'rarely', label: 'Rarely' },
      { id: 'sometimes', label: 'Sometimes' },
      { id: 'regularly', label: 'Regularly' }
    ],
    gradientColors: ['#ff9966', '#ff5e62', '#ff0844']
  },
  {
    id: '5',
    type: 'personal',
    title: 'What should we call you?',
    text: "We'll use this to personalize your experience.",
    inputPlaceholder: 'Your name',
    gradientColors: ['#56ab2f', '#a8e063', '#56ab2f']
  },
  {
    id: '6',
    type: 'final',
    title: "You're all set!",
    text: "We've created a personalized experience just for you. Let's begin your journey to better mental wellness.",
    animationSource: require('../../../assets/images/onboarding/Animation - 1750725331350.json'),
    gradientColors: ['#4776E6', '#8E54E9', '#4776E6']
  }
];

// Combine all slides
const allSlides = [...introSlides, ...questionSlides];

export default function OnboardingScreen({ navigation }) {
  const { completeOnboarding } = useAuth();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const scrollX = useRef(new Animated.Value(0)).current;
  const flatListRef = useRef(null);
  const animationRefs = useRef([]);
  
  // State for user preferences
  const [selectedPreferences, setSelectedPreferences] = useState({});
  const [userName, setUserName] = useState('');
  
  // Handle preference selection
  const togglePreference = (slideId, optionId) => {
    setSelectedPreferences(prev => {
      const slidePrefs = prev[slideId] || [];
      
      if (slidePrefs.includes(optionId)) {
        return {
          ...prev,
          [slideId]: slidePrefs.filter(id => id !== optionId)
        };
      } else {
        return {
          ...prev,
          [slideId]: [...slidePrefs, optionId]
        };
      }
    });
  };
  
  // Check if current slide is valid to proceed
  const isCurrentSlideValid = () => {
    const currentSlide = allSlides[currentIndex];
    
    if (currentSlide.type === 'question' && !selectedPreferences[currentSlide.id]?.length) {
      return false;
    }
    
    if (currentSlide.type === 'personal' && !userName.trim()) {
      return false;
    }
    
    return true;
  };

  const handleNext = async () => {
    // For question slides, validate that at least one option is selected
    if (!isCurrentSlideValid()) {
      // Could show an error message here
      return;
    }
    
    if (currentIndex < allSlides.length - 1) {
      flatListRef.current.scrollToIndex({ index: currentIndex + 1 });
      setCurrentIndex(currentIndex + 1);
    } else {
      setIsLoading(true);
      try {
        // Save user preferences
        const userPreferences = {
          preferences: selectedPreferences,
          name: userName
        };
        
        await AsyncStorage.setItem('userPreferences', JSON.stringify(userPreferences));
        await completeOnboarding();
        navigation.navigate('Signup');
      } catch (error) {
        console.error('Error completing onboarding:', error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleSkip = async () => {
    setIsLoading(true);
    try {
      await completeOnboarding();
      navigation.navigate('Signup');
    } catch (error) {
      console.error('Error completing onboarding:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const renderItem = ({ item }) => {
    const isQuestionSlide = item.type === 'question';
    const isPersonalSlide = item.type === 'personal';
    
    return (
      <SlideContainer>
        <GradientBackground
          colors={item.gradientColors}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        />
        
        {!isQuestionSlide && !isPersonalSlide && (
          <ImageContainer>
            <LottieView
              ref={animation => {
                if (item.animationSource) {
                  animationRefs.current[item.id] = animation;
                }
              }}
              source={item.animationSource}
              autoPlay
              loop
              style={{ width: '100%', height: '100%' }}
            />
          </ImageContainer>
        )}
        
        <SlideTitle>{item.title}</SlideTitle>
        <SlideText>{item.text}</SlideText>
        
        {isQuestionSlide && (
          <PreferenceContainer>
            {item.options.map(option => {
              const isSelected = selectedPreferences[item.id]?.includes(option.id);
              return (
                <PreferenceOption 
                  key={option.id}
                  selected={isSelected}
                  onPress={() => togglePreference(item.id, option.id)}
                >
                  <PreferenceText selected={isSelected}>{option.label}</PreferenceText>
                </PreferenceOption>
              );
            })}
          </PreferenceContainer>
        )}
        
        {isPersonalSlide && (
          <InputContainer>
            <Input
              placeholder={item.inputPlaceholder}
              placeholderTextColor="rgba(255, 255, 255, 0.6)"
              value={userName}
              onChangeText={setUserName}
              autoCapitalize="words"
            />
          </InputContainer>
        )}
      </SlideContainer>
    );
  };

  return (
    <Container>
      <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />
      
      {currentIndex < introSlides.length && (
        <SkipButton onPress={handleSkip} disabled={isLoading}>
          <SkipText>Skip</SkipText>
        </SkipButton>
      )}

      <FlatList
        ref={flatListRef}
        data={allSlides}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        horizontal
        pagingEnabled
        scrollEnabled={false}
        showsHorizontalScrollIndicator={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false }
        )}
      />

      <PaginationContainer>
        {allSlides.map((_, index) => (
          <PaginationDot key={index} active={index === currentIndex} />
        ))}
      </PaginationContainer>

      <ButtonContainer>
        {currentIndex > 0 && (
          <Button
            title="Back"
            variant="secondary"
            size="medium"
            onPress={() => {
              flatListRef.current.scrollToIndex({ index: currentIndex - 1 });
              setCurrentIndex(currentIndex - 1);
            }}
            style={{ flex: 0.45, backgroundColor: 'rgba(255, 255, 255, 0.2)' }}
          />
        )}
        
        <Button
          title={currentIndex === allSlides.length - 1 ? "Get Started" : "Next"}
          variant="primary"
          size="large"
          onPress={handleNext}
          loading={isLoading}
          disabled={isLoading || !isCurrentSlideValid()}
          icon={currentIndex === allSlides.length - 1 ? null : <Ionicons name="arrow-forward" size={20} color="white" style={{ marginLeft: 8 }} />}
          iconPosition="right"
          style={{ flex: currentIndex > 0 ? 0.45 : 1 }}
        />
      </ButtonContainer>
    </Container>
  );
}
