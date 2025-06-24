import React, { useState, useRef } from 'react';
import { View, FlatList, Dimensions, TouchableOpacity, Animated } from 'react-native';
import styled from 'styled-components/native';
import { theme } from '../../theme/theme';
import Button from '../../components/Button';
import { useAuth } from '../../context/AuthContext';
import { Ionicons } from '@expo/vector-icons';
import LottieView from 'lottie-react-native';

const { width } = Dimensions.get('window');

const Container = styled.SafeAreaView`
  flex: 1;
  background-color: ${theme.colors.background};
`;

const SlideContainer = styled.View`
  width: ${width}px;
  align-items: center;
  padding: ${theme.spacing.xl}px;
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
  color: ${theme.colors.primary};
  text-align: center;
  margin-bottom: ${theme.spacing.md}px;
`;

const SlideText = styled.Text`
  font-size: ${theme.typography.fontSize.md}px;
  color: ${theme.colors.text.secondary};
  text-align: center;
  margin-bottom: ${theme.spacing.xxl}px;
  line-height: 24px;
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
  background-color: ${props => props.active ? theme.colors.secondary : theme.colors.gray.light};
  margin: 0 ${theme.spacing.xs}px;
`;

const ButtonContainer = styled.View`
  width: 100%;
  padding: ${theme.spacing.lg}px;
  position: absolute;
  bottom: 0;
`;

const SkipButton = styled.TouchableOpacity`
  position: absolute;
  top: ${theme.spacing.lg}px;
  right: ${theme.spacing.lg}px;
  padding: ${theme.spacing.sm}px;
`;

const SkipText = styled.Text`
  color: ${theme.colors.text.secondary};
  font-size: ${theme.typography.fontSize.md}px;
`;

const slides = [
  {
    id: '1',
    title: 'Welcome to MindEase',
    text: 'Your journey to mental wellness starts here. MindEase helps you manage stress, anxiety, and improve your overall well-being.',
    animationSource: require('../../../assets/images/onboarding/Animation - 1750725331350.json')
  },
  {
    id: '2',
    title: 'Daily Meditation',
    text: 'Access guided meditations tailored to your needs. Just a few minutes each day can transform your mental health.',
    animationSource: require('../../../assets/images/onboarding/Animation - 1750725331350.json')
  },
  {
    id: '3',
    title: 'Breathing Exercises',
    text: 'Learn breathing techniques that help reduce anxiety and bring calm to your day, anytime and anywhere.',
    animationSource: require('../../../assets/images/onboarding/Animation - 1750725331350.json')
  },
  {
    id: '4',
    title: 'Supportive Community',
    text: 'Connect with others on the same journey. Share experiences, give support, and never feel alone.',
    animationSource: require('../../../assets/images/onboarding/Animation - 1750725331350.json')
  }
];

export default function OnboardingScreen({ navigation }) {
  const { completeOnboarding } = useAuth();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const scrollX = useRef(new Animated.Value(0)).current;
  const flatListRef = useRef(null);
  const animationRefs = useRef([]);

  const handleNext = async () => {
    if (currentIndex < slides.length - 1) {
      flatListRef.current.scrollToIndex({ index: currentIndex + 1 });
      setCurrentIndex(currentIndex + 1);
    } else {
      setIsLoading(true);
      try {
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

  const renderItem = ({ item, index }) => {
    return (
      <SlideContainer>
        <ImageContainer>
          <LottieView
            ref={animation => {
              animationRefs.current[index] = animation;
            }}
            source={item.animationSource}
            autoPlay
            loop
            style={{ width: '100%', height: '100%' }}
          />
        </ImageContainer>
        <SlideTitle>{item.title}</SlideTitle>
        <SlideText>{item.text}</SlideText>
      </SlideContainer>
    );
  };

  return (
    <Container>
      <SkipButton onPress={handleSkip} disabled={isLoading}>
        <SkipText>Skip</SkipText>
      </SkipButton>

      <FlatList
        ref={flatListRef}
        data={slides}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false }
        )}
        onMomentumScrollEnd={ev => {
          const newIndex = Math.floor(ev.nativeEvent.contentOffset.x / width);
          setCurrentIndex(newIndex);
        }}
      />

      <PaginationContainer>
        {slides.map((_, index) => (
          <PaginationDot key={index} active={index === currentIndex} />
        ))}
      </PaginationContainer>

      <ButtonContainer>
        <Button
          title={currentIndex === slides.length - 1 ? "Get Started" : "Next"}
          variant="primary"
          size="large"
          onPress={handleNext}
          loading={isLoading}
          disabled={isLoading}
          icon={currentIndex === slides.length - 1 ? null : <Ionicons name="arrow-forward" size={20} color="white" style={{ marginLeft: 8 }} />}
          iconPosition="right"
        />
      </ButtonContainer>
    </Container>
  );
}
