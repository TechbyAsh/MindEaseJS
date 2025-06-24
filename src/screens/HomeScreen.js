import React, { useState } from 'react';
import { ScrollView, TouchableOpacity, View, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styled from 'styled-components/native';
import { theme } from '../theme/theme';
import Header from '../components/Header';
import Card from '../components/Card';
import Button from '../components/Button';
import { useAuth } from '../context/AuthContext';

const Container = styled.SafeAreaView`
  flex: 1;
  background-color: ${theme.colors.background};
`;

const GreetingSection = styled.View`
  padding: ${theme.spacing.lg}px;
  padding-top: 0;
`;

const Greeting = styled.Text`
  font-size: ${theme.typography.fontSize.xxl}px;
  font-weight: ${theme.typography.fontWeight.bold};
  color: ${theme.colors.primary};
  margin-bottom: ${theme.spacing.xs}px;
`;

const SubGreeting = styled.Text`
  font-size: ${theme.typography.fontSize.md}px;
  color: ${theme.colors.text.secondary};
  margin-bottom: ${theme.spacing.md}px;
`;

const MoodContainer = styled(Card)`
  margin-horizontal: ${theme.spacing.lg}px;
  padding: ${theme.spacing.lg}px;
`;

const MoodTitle = styled.Text`
  font-size: ${theme.typography.fontSize.lg}px;
  font-weight: ${theme.typography.fontWeight.semiBold};
  color: ${theme.colors.text.primary};
  margin-bottom: ${theme.spacing.md}px;
`;

const MoodOptionsContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

const MoodOption = styled.TouchableOpacity`
  align-items: center;
  padding: ${theme.spacing.sm}px;
  border-radius: ${theme.borderRadius.md}px;
  background-color: ${props => props.selected ? theme.colors.tertiary + '30' : 'transparent'};
  width: 60px;
`;

const MoodEmoji = styled.Text`
  font-size: 28px;
  margin-bottom: ${theme.spacing.xs}px;
`;

const MoodText = styled.Text`
  font-size: ${theme.typography.fontSize.xs}px;
  color: ${props => props.selected ? theme.colors.primary : theme.colors.text.secondary};
  font-weight: ${props => props.selected ? theme.typography.fontWeight.semiBold : theme.typography.fontWeight.regular};
`;

const SectionTitle = styled.Text`
  font-size: ${theme.typography.fontSize.lg}px;
  font-weight: ${theme.typography.fontWeight.semiBold};
  color: ${theme.colors.text.primary};
  margin: ${theme.spacing.xl}px ${theme.spacing.lg}px ${theme.spacing.md}px ${theme.spacing.lg}px;
`;

const QuickStatsContainer = styled.View`
  flex-direction: row;
  padding: 0 ${theme.spacing.lg}px;
  margin-bottom: ${theme.spacing.md}px;
`;

const StatCard = styled(Card)`
  flex: 1;
  padding: ${theme.spacing.md}px;
  margin-right: ${props => props.isFirst ? theme.spacing.md : 0}px;
  background-color: ${props => props.color || theme.colors.white};
  align-items: center;
`;

const StatValue = styled.Text`
  font-size: ${theme.typography.fontSize.xl}px;
  font-weight: ${theme.typography.fontWeight.bold};
  color: ${theme.colors.primary};
  margin-bottom: ${theme.spacing.xs}px;
`;

const StatLabel = styled.Text`
  font-size: ${theme.typography.fontSize.xs}px;
  color: ${theme.colors.text.secondary};
  text-align: center;
`;

const ActionCardsContainer = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 0 ${theme.spacing.lg}px;
`;

const ActionCard = styled(Card)`
  width: 48%;
  padding: ${theme.spacing.lg}px;
  margin-bottom: ${theme.spacing.md}px;
  background-color: ${props => props.color || theme.colors.white};
`;

const ActionTitle = styled.Text`
  font-size: ${theme.typography.fontSize.md}px;
  font-weight: ${theme.typography.fontWeight.semiBold};
  color: ${theme.colors.text.primary};
  margin-bottom: ${theme.spacing.xs}px;
`;

const ActionDescription = styled.Text`
  font-size: ${theme.typography.fontSize.xs}px;
  color: ${theme.colors.text.secondary};
  margin-bottom: ${theme.spacing.md}px;
  flex: 1;
`;

const ActionIcon = styled.View`
  margin-top: ${theme.spacing.sm}px;
`;

const SOSButton = styled(Button)`
  margin: ${theme.spacing.lg}px;
`;

export default function HomeScreen({ navigation }) {
  const { currentUser } = useAuth();
  const [selectedMood, setSelectedMood] = useState(null);
  
  const moods = [
    { emoji: '😔', text: 'Stressed' },
    { emoji: '😕', text: 'Anxious' },
    { emoji: '😐', text: 'Neutral' },
    { emoji: '🙂', text: 'Content' },
    { emoji: '😊', text: 'Happy' }
  ];

  // Get current time to display appropriate greeting
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 18) return 'Good Afternoon';
    return 'Good Evening';
  };

  return (
    <Container>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Header 
          title="MindEase"
          rightIcon="notifications-outline"
          onRightPress={() => {}}
          secondRightIcon="settings-outline"
          onSecondRightPress={() => {}}
        />
        
        <GreetingSection>
          <Greeting>{getGreeting()}, {currentUser?.name || 'Friend'}!</Greeting>
          <SubGreeting>How are you feeling today?</SubGreeting>
        </GreetingSection>

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
                <MoodText selected={selectedMood === index}>{mood.text}</MoodText>
              </MoodOption>
            ))}
          </MoodOptionsContainer>
        </MoodContainer>

        <QuickStatsContainer>
          <StatCard isFirst color={theme.colors.card.meditation + '40'}>
            <StatValue>7</StatValue>
            <StatLabel>Day streak</StatLabel>
          </StatCard>
          <StatCard color={theme.colors.card.breathing + '40'}>
            <StatValue>23</StatValue>
            <StatLabel>Minutes today</StatLabel>
          </StatCard>
        </QuickStatsContainer>

        <SectionTitle>Suggested for you</SectionTitle>
        <ActionCardsContainer>
          <ActionCard 
            color={theme.colors.card.meditation}
            onPress={() => navigation.navigate('Meditation')}
          >
            <ActionTitle>Meditation</ActionTitle>
            <ActionDescription>Take a moment to center yourself</ActionDescription>
            <ActionIcon>
              <Ionicons name="leaf-outline" size={24} color={theme.colors.secondary} />
            </ActionIcon>
          </ActionCard>
          
          <ActionCard 
            color={theme.colors.card.breathing}
            onPress={() => navigation.navigate('Breathing')}
          >
            <ActionTitle>Breathing</ActionTitle>
            <ActionDescription>Calm your mind with guided breathing</ActionDescription>
            <ActionIcon>
              <Ionicons name="water-outline" size={24} color={theme.colors.secondary} />
            </ActionIcon>
          </ActionCard>
          
          <ActionCard 
            color={theme.colors.card.community}
            onPress={() => navigation.navigate('Community')}
          >
            <ActionTitle>Community</ActionTitle>
            <ActionDescription>Connect with others on the same journey</ActionDescription>
            <ActionIcon>
              <Ionicons name="people-outline" size={24} color={theme.colors.secondary} />
            </ActionIcon>
          </ActionCard>
          
          <ActionCard 
            color={theme.colors.card.progress}
            onPress={() => navigation.navigate('Profile')}
          >
            <ActionTitle>Progress</ActionTitle>
            <ActionDescription>Track your mindfulness journey</ActionDescription>
            <ActionIcon>
              <Ionicons name="stats-chart-outline" size={24} color={theme.colors.secondary} />
            </ActionIcon>
          </ActionCard>
        </ActionCardsContainer>

        <SOSButton 
          title="SOS - I need help now"
          onPress={() => navigation.navigate('SOS')}
          variant="primary"
          icon={<Ionicons name="medkit-outline" size={20} color="white" style={{ marginRight: 8 }} />}
          iconPosition="left"
        />
      </ScrollView>
    </Container>
  );
}
