import React, { useState, useRef, useEffect } from 'react';
import { View, TouchableOpacity, Animated, Easing } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styled from 'styled-components/native';
import { theme } from '../theme/theme';
import Header from '../components/Header';
import Card from '../components/Card';
import Button from '../components/Button';

const Container = styled.SafeAreaView`
  flex: 1;
  background-color: ${theme.colors.background};
`;

const Content = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: ${theme.spacing.lg}px;
`;

const ExerciseCard = styled(Card)`
  width: 100%;
  padding: ${theme.spacing.xl}px;
  align-items: center;
  background-color: ${theme.colors.card.breathing};
`;

const ExerciseTitle = styled.Text`
  font-size: ${theme.typography.fontSize.xl}px;
  font-weight: ${theme.typography.fontWeight.bold};
  color: ${theme.colors.text.primary};
  margin-bottom: ${theme.spacing.md}px;
  text-align: center;
`;

const ExerciseDescription = styled.Text`
  font-size: ${theme.typography.fontSize.md}px;
  color: ${theme.colors.text.secondary};
  margin-bottom: ${theme.spacing.xl}px;
  text-align: center;
  line-height: 22px;
`;

const AnimationContainer = styled.View`
  width: 200px;
  height: 200px;
  align-items: center;
  justify-content: center;
  margin: ${theme.spacing.xl}px 0;
`;

const CircleOuter = styled(Animated.View)`
  width: 200px;
  height: 200px;
  border-radius: 100px;
  background-color: ${theme.colors.secondary + '20'};
  align-items: center;
  justify-content: center;
  position: absolute;
`;

const CircleMiddle = styled(Animated.View)`
  width: 150px;
  height: 150px;
  border-radius: 75px;
  background-color: ${theme.colors.secondary + '40'};
  align-items: center;
  justify-content: center;
  position: absolute;
`;

const CircleInner = styled(Animated.View)`
  width: 100px;
  height: 100px;
  border-radius: 50px;
  background-color: ${theme.colors.secondary};
  align-items: center;
  justify-content: center;
  position: absolute;
`;

const InstructionText = styled.Text`
  font-size: ${theme.typography.fontSize.lg}px;
  font-weight: ${theme.typography.fontWeight.semiBold};
  color: ${theme.colors.white};
  text-align: center;
`;

const TimerText = styled.Text`
  font-size: ${theme.typography.fontSize.md}px;
  color: ${theme.colors.text.secondary};
  margin-top: ${theme.spacing.md}px;
`;

const ButtonContainer = styled.View`
  flex-direction: row;
  justify-content: center;
  margin-top: ${theme.spacing.xl}px;
`;

const ExerciseSelector = styled.View`
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  margin-bottom: ${theme.spacing.lg}px;
`;

const ExerciseOption = styled.TouchableOpacity`
  background-color: ${props => props.selected ? theme.colors.secondary : theme.colors.white};
  padding: ${theme.spacing.sm}px ${theme.spacing.md}px;
  border-radius: ${theme.borderRadius.md}px;
  ${theme.shadows.small}
`;

const ExerciseOptionText = styled.Text`
  color: ${props => props.selected ? theme.colors.white : theme.colors.text.primary};
  font-weight: ${props => props.selected ? theme.typography.fontWeight.semiBold : theme.typography.fontWeight.regular};
`;

const breathingPatterns = [
  {
    id: '4-7-8',
    name: '4-7-8',
    description: 'Inhale for 4 seconds, hold for 7 seconds, exhale for 8 seconds',
    inhale: 4,
    hold: 7,
    exhale: 8,
  },
  {
    id: 'box',
    name: 'Box Breathing',
    description: 'Inhale for 4 seconds, hold for 4 seconds, exhale for 4 seconds, hold for 4 seconds',
    inhale: 4,
    hold: 4,
    exhale: 4,
    holdAfterExhale: 4,
  },
  {
    id: 'calm',
    name: 'Calming Breath',
    description: 'Inhale for 3 seconds, hold for 2 seconds, exhale for 6 seconds',
    inhale: 3,
    hold: 2,
    exhale: 6,
  },
];

export default function BreathingScreen({ navigation }) {
  const [selectedPattern, setSelectedPattern] = useState(breathingPatterns[0]);
  const [isActive, setIsActive] = useState(false);
  const [currentPhase, setCurrentPhase] = useState('ready'); // ready, inhale, hold, exhale, holdAfterExhale
  const [timeLeft, setTimeLeft] = useState(0);
  const [totalTime, setTotalTime] = useState(0);
  
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const opacityAnim = useRef(new Animated.Value(1)).current;
  
  // Reset animation and timer when pattern changes
  useEffect(() => {
    setIsActive(false);
    setCurrentPhase('ready');
    scaleAnim.setValue(1);
    opacityAnim.setValue(1);
  }, [selectedPattern]);
  
  // Handle breathing animation and timer
  useEffect(() => {
    let interval;
    
    if (isActive) {
      if (currentPhase === 'ready') {
        // Start with inhale
        setCurrentPhase('inhale');
        setTimeLeft(selectedPattern.inhale);
        setTotalTime(selectedPattern.inhale);
        
        // Animate circle expanding
        Animated.parallel([
          Animated.timing(scaleAnim, {
            toValue: 1.5,
            duration: selectedPattern.inhale * 1000,
            easing: Easing.linear,
            useNativeDriver: true,
          }),
          Animated.timing(opacityAnim, {
            toValue: 0.7,
            duration: selectedPattern.inhale * 1000,
            easing: Easing.linear,
            useNativeDriver: true,
          }),
        ]).start();
      }
      
      interval = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            // Move to next phase
            switch (currentPhase) {
              case 'inhale':
                setCurrentPhase('hold');
                setTimeLeft(selectedPattern.hold);
                setTotalTime(selectedPattern.hold);
                return selectedPattern.hold;
              
              case 'hold':
                setCurrentPhase('exhale');
                setTimeLeft(selectedPattern.exhale);
                setTotalTime(selectedPattern.exhale);
                
                // Animate circle contracting
                Animated.parallel([
                  Animated.timing(scaleAnim, {
                    toValue: 1,
                    duration: selectedPattern.exhale * 1000,
                    easing: Easing.linear,
                    useNativeDriver: true,
                  }),
                  Animated.timing(opacityAnim, {
                    toValue: 1,
                    duration: selectedPattern.exhale * 1000,
                    easing: Easing.linear,
                    useNativeDriver: true,
                  }),
                ]).start();
                
                return selectedPattern.exhale;
              
              case 'exhale':
                if (selectedPattern.holdAfterExhale) {
                  setCurrentPhase('holdAfterExhale');
                  setTimeLeft(selectedPattern.holdAfterExhale);
                  setTotalTime(selectedPattern.holdAfterExhale);
                  return selectedPattern.holdAfterExhale;
                } else {
                  setCurrentPhase('inhale');
                  setTimeLeft(selectedPattern.inhale);
                  setTotalTime(selectedPattern.inhale);
                  
                  // Animate circle expanding again
                  Animated.parallel([
                    Animated.timing(scaleAnim, {
                      toValue: 1.5,
                      duration: selectedPattern.inhale * 1000,
                      easing: Easing.linear,
                      useNativeDriver: true,
                    }),
                    Animated.timing(opacityAnim, {
                      toValue: 0.7,
                      duration: selectedPattern.inhale * 1000,
                      easing: Easing.linear,
                      useNativeDriver: true,
                    }),
                  ]).start();
                  
                  return selectedPattern.inhale;
                }
              
              case 'holdAfterExhale':
                setCurrentPhase('inhale');
                setTimeLeft(selectedPattern.inhale);
                setTotalTime(selectedPattern.inhale);
                
                // Animate circle expanding again
                Animated.parallel([
                  Animated.timing(scaleAnim, {
                    toValue: 1.5,
                    duration: selectedPattern.inhale * 1000,
                    easing: Easing.linear,
                    useNativeDriver: true,
                  }),
                  Animated.timing(opacityAnim, {
                    toValue: 0.7,
                    duration: selectedPattern.inhale * 1000,
                    easing: Easing.linear,
                    useNativeDriver: true,
                  }),
                ]).start();
                
                return selectedPattern.inhale;
              
              default:
                return prev;
            }
          }
          return prev - 1;
        });
      }, 1000);
    }
    
    return () => clearInterval(interval);
  }, [isActive, currentPhase, selectedPattern]);
  
  const getInstructionText = () => {
    switch (currentPhase) {
      case 'ready':
        return 'Press start';
      case 'inhale':
        return 'Inhale';
      case 'hold':
        return 'Hold';
      case 'exhale':
        return 'Exhale';
      case 'holdAfterExhale':
        return 'Hold';
      default:
        return '';
    }
  };
  
  const toggleActive = () => {
    setIsActive(!isActive);
    if (isActive) {
      // Reset animation when stopping
      scaleAnim.setValue(1);
      opacityAnim.setValue(1);
      setCurrentPhase('ready');
    }
  };
  
  return (
    <Container>
      <Header 
        title="Breathing"
        subtitle="Take a moment to breathe"
        leftIcon="arrow-back"
        onLeftPress={() => navigation.goBack()}
      />
      
      <ExerciseSelector>
        {breathingPatterns.map(pattern => (
          <ExerciseOption 
            key={pattern.id}
            selected={selectedPattern.id === pattern.id}
            onPress={() => setSelectedPattern(pattern)}
          >
            <ExerciseOptionText selected={selectedPattern.id === pattern.id}>
              {pattern.name}
            </ExerciseOptionText>
          </ExerciseOption>
        ))}
      </ExerciseSelector>
      
      <Content>
        <ExerciseCard>
          <ExerciseTitle>{selectedPattern.name}</ExerciseTitle>
          <ExerciseDescription>{selectedPattern.description}</ExerciseDescription>
          
          <AnimationContainer>
            <CircleOuter style={{ 
              transform: [{ scale: scaleAnim }],
              opacity: opacityAnim
            }} />
            <CircleMiddle style={{ 
              transform: [{ scale: scaleAnim }],
              opacity: opacityAnim
            }} />
            <CircleInner style={{ 
              transform: [{ scale: scaleAnim }],
              opacity: opacityAnim
            }}>
              <InstructionText>{getInstructionText()}</InstructionText>
            </CircleInner>
          </AnimationContainer>
          
          {isActive && currentPhase !== 'ready' && (
            <TimerText>{timeLeft} seconds</TimerText>
          )}
          
          <ButtonContainer>
            <Button
              title={isActive ? "Stop" : "Start"}
              onPress={toggleActive}
              variant={isActive ? "outlined" : "primary"}
              size="large"
            />
          </ButtonContainer>
        </ExerciseCard>
      </Content>
    </Container>
  );
}
