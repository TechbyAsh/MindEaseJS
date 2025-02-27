
import React, { useState, useRef, useEffect } from 'react';
import { Animated, Easing, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styled from 'styled-components/native';

const Container = styled.SafeAreaView`
  flex: 1;
  background-color: #f8f8ff;
`;

const Header = styled.View`
  padding: 20px;
  align-items: center;
`;

const Title = styled.Text`
  font-size: 24px;
  font-weight: bold;
  color: #333;
  margin-bottom: 10px;
`;

const Description = styled.Text`
  font-size: 16px;
  color: #666;
  text-align: center;
  margin-bottom: 20px;
`;

const BreathingContainer = styled.View`
  align-items: center;
  justify-content: center;
  margin: 20px 0;
  height: 250px;
`;

const BreathingCircle = styled(Animated.View)`
  width: 200px;
  height: 200px;
  border-radius: 100px;
  background-color: #20B2AA;
  justify-content: center;
  align-items: center;
`;

const BreathingText = styled.Text`
  color: white;
  font-size: 22px;
  font-weight: bold;
`;

const ProgressText = styled.Text`
  font-size: 16px;
  color: #666;
  margin-top: 10px;
`;

const ExerciseSelectionContainer = styled.View`
  padding: 0 20px;
  margin-bottom: 20px;
`;

const SectionTitle = styled.Text`
  font-size: 18px;
  font-weight: bold;
  margin: 10px 0;
  color: #333;
`;

const ExerciseCard = styled.TouchableOpacity`
  background-color: ${props => props.selected ? '#e0ffff' : 'white'};
  border-radius: 15px;
  padding: 15px 20px;
  margin-bottom: 10px;
  flex-direction: row;
  align-items: center;
  border: 1px solid ${props => props.selected ? '#20B2AA' : '#eee'};
`;

const ExerciseInfo = styled.View`
  flex: 1;
  margin-left: 15px;
`;

const ExerciseTitle = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: #333;
  margin-bottom: 5px;
`;

const ExerciseDescription = styled.Text`
  font-size: 14px;
  color: #666;
`;

const ControlButton = styled.TouchableOpacity`
  background-color: ${props => props.primary ? '#20B2AA' : '#f8f8ff'};
  border-radius: 30px;
  padding: 15px 30px;
  margin: 10px;
  align-items: center;
  border: 1px solid ${props => props.primary ? '#20B2AA' : '#ddd'};
`;

const ButtonText = styled.Text`
  color: ${props => props.primary ? 'white' : '#333'};
  font-size: 16px;
  font-weight: bold;
`;

const ControlsContainer = styled.View`
  flex-direction: row;
  justify-content: center;
  margin: 20px 0;
`;

const breathingExercises = [
  {
    id: 1,
    title: '4-7-8 Breathing',
    description: 'Inhale for 4 counts, hold for 7, exhale for 8',
    icon: 'water-outline',
    pattern: { inhale: 4, hold: 7, exhale: 8 }
  },
  {
    id: 2,
    title: 'Box Breathing',
    description: 'Equal counts of 4 for inhale, hold, exhale, and pause',
    icon: 'square-outline',
    pattern: { inhale: 4, hold: 4, exhale: 4, pause: 4 }
  },
  {
    id: 3,
    title: 'Calming Breath',
    description: 'Slow breathing with longer exhales to promote relaxation',
    icon: 'leaf-outline',
    pattern: { inhale: 4, hold: 2, exhale: 6 }
  }
];

export default function BreathingScreen() {
  const [selectedExercise, setSelectedExercise] = useState(breathingExercises[0]);
  const [isBreathing, setIsBreathing] = useState(false);
  const [breathingState, setBreathingState] = useState('Ready');
  const [cycles, setCycles] = useState(0);
  const animatedValue = useRef(new Animated.Value(1)).current;
  const breathingAnimation = useRef(null);

  useEffect(() => {
    return () => {
      if (breathingAnimation.current) {
        breathingAnimation.current.stop();
      }
    };
  }, []);

  const startBreathingExercise = () => {
    setIsBreathing(true);
    setCycles(0);
    runBreathingCycle();
  };

  const stopBreathingExercise = () => {
    if (breathingAnimation.current) {
      breathingAnimation.current.stop();
    }
    setIsBreathing(false);
    setBreathingState('Ready');
    animatedValue.setValue(1);
  };

  const runBreathingCycle = () => {
    const { inhale, hold, exhale, pause } = selectedExercise.pattern;
    
    const animations = [];
    let totalDuration = 0;
    
    // Inhale
    animations.push(Animated.timing(animatedValue, {
      toValue: 1.3,
      duration: inhale * 1000,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true
    }));
    
    // Hold
    if (hold) {
      animations.push(Animated.timing(animatedValue, {
        toValue: 1.3,
        duration: hold * 1000,
        easing: Easing.linear,
        useNativeDriver: true
      }));
    }
    
    // Exhale
    animations.push(Animated.timing(animatedValue, {
      toValue: 1,
      duration: exhale * 1000,
      easing: Easing.in(Easing.cubic),
      useNativeDriver: true
    }));
    
    // Pause after exhale
    if (pause) {
      animations.push(Animated.timing(animatedValue, {
        toValue: 1,
        duration: pause * 1000,
        easing: Easing.linear,
        useNativeDriver: true
      }));
    }
    
    totalDuration = (inhale + (hold || 0) + exhale + (pause || 0)) * 1000;
    
    // Update breathing state text
    setBreathingState('Breathe in');
    const stateTimeouts = [];
    let currentTime = inhale * 1000;
    
    if (hold) {
      stateTimeouts.push(setTimeout(() => setBreathingState('Hold'), currentTime));
      currentTime += hold * 1000;
    }
    
    stateTimeouts.push(setTimeout(() => setBreathingState('Breathe out'), currentTime));
    currentTime += exhale * 1000;
    
    if (pause) {
      stateTimeouts.push(setTimeout(() => setBreathingState('Pause'), currentTime));
    }
    
    // Run the animation sequence
    breathingAnimation.current = Animated.sequence(animations);
    breathingAnimation.current.start(({ finished }) => {
      if (finished && isBreathing) {
        setCycles(prev => prev + 1);
        runBreathingCycle();
      }
    });
    
    return () => {
      stateTimeouts.forEach(timeout => clearTimeout(timeout));
    };
  };

  return (
    <Container>
      <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>
        <Header>
          <Title>Breathing Exercises</Title>
          <Description>
            Focused breathing can help reduce stress and increase mindfulness
          </Description>
        </Header>

        <BreathingContainer>
          <BreathingCircle
            style={{
              transform: [
                { scale: animatedValue }
              ]
            }}
          >
            <BreathingText>{breathingState}</BreathingText>
          </BreathingCircle>
          {isBreathing && (
            <ProgressText>Cycles completed: {cycles}</ProgressText>
          )}
        </BreathingContainer>

        <ControlsContainer>
          {!isBreathing ? (
            <ControlButton primary onPress={startBreathingExercise}>
              <ButtonText primary>Start</ButtonText>
            </ControlButton>
          ) : (
            <ControlButton primary onPress={stopBreathingExercise}>
              <ButtonText primary>Stop</ButtonText>
            </ControlButton>
          )}
        </ControlsContainer>

        <ExerciseSelectionContainer>
          <SectionTitle>Choose an Exercise</SectionTitle>
          {breathingExercises.map(exercise => (
            <ExerciseCard 
              key={exercise.id}
              selected={selectedExercise.id === exercise.id}
              onPress={() => {
                if (!isBreathing) {
                  setSelectedExercise(exercise);
                }
              }}
            >
              <Ionicons 
                name={exercise.icon} 
                size={24} 
                color={selectedExercise.id === exercise.id ? '#20B2AA' : '#999'} 
              />
              <ExerciseInfo>
                <ExerciseTitle>{exercise.title}</ExerciseTitle>
                <ExerciseDescription>{exercise.description}</ExerciseDescription>
              </ExerciseInfo>
            </ExerciseCard>
          ))}
        </ExerciseSelectionContainer>
      </ScrollView>
    </Container>
  );
}
