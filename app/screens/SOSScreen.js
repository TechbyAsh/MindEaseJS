import React, { useState, useEffect, useRef } from 'react';
import { Animated, Easing, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styled from 'styled-components/native';

const Container = styled.SafeAreaView`
  flex: 1;
  background-color: #fff;
`;

const ContentContainer = styled.View`
  padding: 20px;
`;

const Title = styled.Text`
  font-size: 24px;
  font-weight: bold;
  color: #333;
  margin-bottom: 15px;
  text-align: center;
`;

const Message = styled.Text`
  font-size: 16px;
  color: #666;
  line-height: 24px;
  margin-bottom: 25px;
  text-align: center;
`;

const BreathingContainer = styled.View`
  align-items: center;
  justify-content: center;
  margin: 20px 0;
  height: 200px;
`;

const BreathingCircle = styled(Animated.View)`
  width: 150px;
  height: 150px;
  border-radius: 75px;
  background-color: #6A5ACD;
  justify-content: center;
  align-items: center;
`;

const BreathingText = styled.Text`
  color: white;
  font-size: 18px;
  font-weight: bold;
`;

const SectionTitle = styled.Text`
  font-size: 20px;
  font-weight: bold;
  color: #333;
  margin: 15px 0;
`;

const GroundingCard = styled.View`
  background-color: #f8f8ff;
  border-radius: 15px;
  padding: 15px;
  margin-bottom: 15px;
`;

const GroundingTitle = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: #6A5ACD;
  margin-bottom: 10px;
`;

const GroundingDescription = styled.Text`
  font-size: 14px;
  color: #555;
  line-height: 22px;
`;

const HelpButton = styled.TouchableOpacity`
  background-color: #6A5ACD;
  border-radius: 10px;
  padding: 15px;
  margin: 20px 0;
  align-items: center;
`;

const HelpButtonText = styled.Text`
  color: white;
  font-size: 16px;
  font-weight: bold;
`;

export default function SOSScreen() {
  const [breathingState, setBreathingState] = useState('Breathe in');
  const animatedValue = new Animated.Value(1);

  useEffect(() => {
    startBreathingAnimation();
  }, []);

  const startBreathingAnimation = () => {
    const breathIn = Animated.timing(animatedValue, {
      toValue: 1.3,
      duration: 4000,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: false // Changed for web compatibility
    });

    const holdBreath = Animated.timing(animatedValue, {
      toValue: 1.3,
      duration: 2000,
      easing: Easing.linear,
      useNativeDriver: false // Changed for web compatibility
    });

    const breathOut = Animated.timing(animatedValue, {
      toValue: 1,
      duration: 4000,
      easing: Easing.in(Easing.cubic),
      useNativeDriver: false // Changed for web compatibility
    });

    Animated.sequence([
      breathIn,
      holdBreath,
      breathOut
    ]).start(() => {
      // Loop the animation
      startBreathingAnimation();
    });

    // Update text based on animation state
    setTimeout(() => setBreathingState('Breathe in'), 0);
    setTimeout(() => setBreathingState('Hold'), 4000);
    setTimeout(() => setBreathingState('Breathe out'), 6000);
  };

  return (
    <Container>
      <ScrollView>
        <ContentContainer>
          <Title>You're going to be okay</Title>
          <Message>
            Let's take a moment to calm down together. Focus on your breathing and try these grounding techniques.
          </Message>

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
          </BreathingContainer>

          <SectionTitle>Grounding Techniques</SectionTitle>

          <GroundingCard>
            <GroundingTitle>5-4-3-2-1 Technique</GroundingTitle>
            <GroundingDescription>
              • Acknowledge 5 things you can see around you{'\n'}
              • Acknowledge 4 things you can touch around you{'\n'}
              • Acknowledge 3 things you can hear{'\n'}
              • Acknowledge 2 things you can smell{'\n'}
              • Acknowledge 1 thing you can taste
            </GroundingDescription>
          </GroundingCard>

          <GroundingCard>
            <GroundingTitle>Body Awareness</GroundingTitle>
            <GroundingDescription>
              Place both feet on the ground and press them firmly down. Feel the connection between your feet and the earth. Notice the sensation of your clothes on your body, the temperature of the air, and the feeling of your breath.
            </GroundingDescription>
          </GroundingCard>

          <GroundingCard>
            <GroundingTitle>Mental Grounding</GroundingTitle>
            <GroundingDescription>
              Say your name, today's date, where you are, and what you did this morning. List five people in your life or five places you enjoy visiting.
            </GroundingDescription>
          </GroundingCard>

          <HelpButton>
            <HelpButtonText>Talk to a Support Buddy</HelpButtonText>
          </HelpButton>
        </ContentContainer>
      </ScrollView>
    </Container>
  );
}