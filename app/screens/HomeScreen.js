
import React, { useState } from 'react';
import { TouchableOpacity, ScrollView } from 'react-native';
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

const Greeting = styled.Text`
  font-size: 28px;
  font-weight: bold;
  color: #333;
  margin-bottom: 5px;
`;

const SubGreeting = styled.Text`
  font-size: 16px;
  color: #666;
  margin-bottom: 20px;
`;

const MoodContainer = styled.View`
  padding: 20px;
  background-color: white;
  border-radius: 15px;
  margin: 0 20px;
  elevation: 3;
  shadow-opacity: 0.1;
  shadow-radius: 5px;
  shadow-color: #000;
  shadow-offset: 0px 3px;
`;

const MoodTitle = styled.Text`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 15px;
  color: #333;
`;

const MoodOptionsContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 10px;
`;

const MoodOption = styled.TouchableOpacity`
  align-items: center;
  padding: 10px;
  border-radius: 10px;
  background-color: ${props => props.selected ? '#e6e6fa' : 'transparent'};
`;

const MoodEmoji = styled.Text`
  font-size: 24px;
  margin-bottom: 5px;
`;

const MoodText = styled.Text`
  font-size: 12px;
  color: #666;
`;

const QuickActionsTitle = styled.Text`
  font-size: 18px;
  font-weight: bold;
  margin: 25px 20px 15px 20px;
  color: #333;
`;

const ActionCardsContainer = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 0 20px;
`;

const ActionCard = styled.TouchableOpacity`
  width: 48%;
  background-color: ${props => props.color || '#fff'};
  border-radius: 15px;
  padding: 20px;
  margin-bottom: 15px;
  elevation: 2;
  shadow-opacity: 0.1;
  shadow-radius: 3px;
  shadow-color: #000;
  shadow-offset: 0px 2px;
`;

const ActionTitle = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: ${props => props.textColor || '#333'};
  margin-bottom: 5px;
`;

const ActionDescription = styled.Text`
  font-size: 12px;
  color: ${props => props.textColor || '#666'};
  margin-bottom: 10px;
`;

const SOSButton = styled.TouchableOpacity`
  background-color: #ff6347;
  border-radius: 30px;
  padding: 15px 25px;
  margin: 20px 20px;
  align-items: center;
  flex-direction: row;
  justify-content: center;
`;

const SOSText = styled.Text`
  color: white;
  font-size: 16px;
  font-weight: bold;
  margin-left: 10px;
`;

export default function HomeScreen({ navigation }) {
  const [selectedMood, setSelectedMood] = useState(null);
  
  const moods = [
    { emoji: '😔', text: 'Stressed' },
    { emoji: '😕', text: 'Anxious' },
    { emoji: '😐', text: 'Neutral' },
    { emoji: '🙂', text: 'Content' },
    { emoji: '😊', text: 'Happy' }
  ];

  return (
    <Container>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Header>
          <Greeting>Hello there,</Greeting>
          <SubGreeting>How are you feeling today?</SubGreeting>
        </Header>

        <MoodContainer>
          <MoodTitle>My mood right now is...</MoodTitle>
          <MoodOptionsContainer>
            {moods.map((mood, index) => (
              <MoodOption 
                key={index} 
                selected={selectedMood === index}
                onPress={() => setSelectedMood(index)}
              >
                <MoodEmoji>{mood.emoji}</MoodEmoji>
                <MoodText>{mood.text}</MoodText>
              </MoodOption>
            ))}
          </MoodOptionsContainer>
        </MoodContainer>

        <QuickActionsTitle>Suggested for you</QuickActionsTitle>
        <ActionCardsContainer>
          <ActionCard 
            color="#e6e6fa" 
            onPress={() => navigation.navigate('Meditate')}
          >
            <ActionTitle>Meditation</ActionTitle>
            <ActionDescription>Take a moment to center yourself</ActionDescription>
            <Ionicons name="leaf-outline" size={24} color="#6A5ACD" />
          </ActionCard>
          
          <ActionCard 
            color="#e0ffff" 
            onPress={() => navigation.navigate('Breathe')}
          >
            <ActionTitle>Breathing</ActionTitle>
            <ActionDescription>Calm your mind with guided breathing</ActionDescription>
            <Ionicons name="water-outline" size={24} color="#20B2AA" />
          </ActionCard>
          
          <ActionCard 
            color="#fff0f5" 
            onPress={() => navigation.navigate('Community')}
          >
            <ActionTitle>Community</ActionTitle>
            <ActionDescription>Connect with others on the same journey</ActionDescription>
            <Ionicons name="people-outline" size={24} color="#DB7093" />
          </ActionCard>
          
          <ActionCard 
            color="#f0f8ff" 
            onPress={() => navigation.navigate('Profile')}
          >
            <ActionTitle>Stats & Progress</ActionTitle>
            <ActionDescription>Track your mindfulness journey</ActionDescription>
            <Ionicons name="stats-chart-outline" size={24} color="#4682B4" />
          </ActionCard>
        </ActionCardsContainer>

        <SOSButton onPress={() => navigation.navigate('SOS')}>
          <Ionicons name="medkit-outline" size={20} color="white" />
          <SOSText>SOS - I need help now</SOSText>
        </SOSButton>
      </ScrollView>
    </Container>
  );
}
