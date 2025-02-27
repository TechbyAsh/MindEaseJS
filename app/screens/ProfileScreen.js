
import React from 'react';
import { ScrollView, TouchableOpacity } from 'react-native';
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

const Avatar = styled.View`
  width: 100px;
  height: 100px;
  border-radius: 50px;
  background-color: #ddd;
  margin-bottom: 15px;
  justify-content: center;
  align-items: center;
`;

const UserName = styled.Text`
  font-size: 24px;
  font-weight: bold;
  color: #333;
  margin-bottom: 5px;
`;

const UserBio = styled.Text`
  font-size: 14px;
  color: #666;
  text-align: center;
  margin-bottom: 15px;
`;

const StatsContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  width: 80%;
  margin: 10px 0;
`;

const StatItem = styled.View`
  align-items: center;
`;

const StatValue = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: #6A5ACD;
`;

const StatLabel = styled.Text`
  font-size: 12px;
  color: #666;
`;

const SectionTitle = styled.Text`
  font-size: 18px;
  font-weight: bold;
  margin: 15px 20px 10px 20px;
  color: #333;
`;

const ProgressContainer = styled.View`
  margin: 0 20px 20px 20px;
  background-color: white;
  border-radius: 15px;
  padding: 15px;
  elevation: 2;
  shadow-opacity: 0.1;
  shadow-radius: 3px;
  shadow-color: #000;
  shadow-offset: 0px 2px;
`;

const ProgressHeader = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 15px;
`;

const ProgressTitle = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: #333;
`;

const ProgressValue = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: #6A5ACD;
`;

const ProgressBarContainer = styled.View`
  height: 10px;
  background-color: #f0f0f0;
  border-radius: 5px;
  margin-bottom: 5px;
  overflow: hidden;
`;

const ProgressBar = styled.View`
  height: 100%;
  width: ${props => props.progress}%;
  background-color: #6A5ACD;
  border-radius: 5px;
`;

const ProgressText = styled.Text`
  font-size: 12px;
  color: #666;
  margin-bottom: 10px;
`;

const InsightCard = styled.View`
  margin: 0 20px 15px 20px;
  background-color: white;
  border-radius: 15px;
  padding: 15px;
  elevation: 2;
  shadow-opacity: 0.1;
  shadow-radius: 3px;
  shadow-color: #000;
  shadow-offset: 0px 2px;
`;

const InsightTitle = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: #333;
  margin-bottom: 10px;
`;

const InsightText = styled.Text`
  font-size: 14px;
  color: #666;
  line-height: 20px;
`;

const AchievementsContainer = styled.ScrollView`
  margin-bottom: 15px;
`;

const AchievementCard = styled.View`
  width: 120px;
  align-items: center;
  background-color: white;
  border-radius: 15px;
  margin-left: ${props => (props.index === 0 ? '20px' : '10px')};
  margin-right: 10px;
  padding: 15px;
  elevation: 2;
  shadow-opacity: 0.1;
  shadow-radius: 3px;
  shadow-color: #000;
  shadow-offset: 0px 2px;
`;

const AchievementIcon = styled.View`
  width: 50px;
  height: 50px;
  border-radius: 25px;
  background-color: ${props => props.earned ? '#f0f0ff' : '#f5f5f5'};
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
`;

const AchievementTitle = styled.Text`
  font-size: 14px;
  font-weight: bold;
  color: ${props => props.earned ? '#333' : '#999'};
  text-align: center;
  margin-bottom: 5px;
`;

const AchievementProgress = styled.Text`
  font-size: 12px;
  color: ${props => props.earned ? '#6A5ACD' : '#999'};
`;

const SettingsButton = styled.TouchableOpacity`
  position: absolute;
  top: 20px;
  right: 20px;
`;

const achievements = [
  {
    id: 1,
    title: 'Mindfulness Novice',
    earned: true,
    progress: '100%',
    icon: 'leaf-outline'
  },
  {
    id: 2,
    title: 'Week Streak',
    earned: true,
    progress: '100%',
    icon: 'calendar-outline'
  },
  {
    id: 3,
    title: 'Breathing Master',
    earned: false,
    progress: '60%',
    icon: 'water-outline'
  },
  {
    id: 4,
    title: 'Community Helper',
    earned: false,
    progress: '30%',
    icon: 'people-outline'
  }
];

export default function ProfileScreen() {
  return (
    <Container>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Header>
          <SettingsButton>
            <Ionicons name="settings-outline" size={24} color="#666" />
          </SettingsButton>
          <Avatar>
            <Ionicons name="person" size={50} color="#bbb" />
          </Avatar>
          <UserName>Alex Johnson</UserName>
          <UserBio>Finding peace in a busy world, one breath at a time.</UserBio>
          
          <StatsContainer>
            <StatItem>
              <StatValue>14</StatValue>
              <StatLabel>Days Streak</StatLabel>
            </StatItem>
            <StatItem>
              <StatValue>42</StatValue>
              <StatLabel>Sessions</StatLabel>
            </StatItem>
            <StatItem>
              <StatValue>280</StatValue>
              <StatLabel>Minutes</StatLabel>
            </StatItem>
          </StatsContainer>
        </Header>

        <SectionTitle>Weekly Goals</SectionTitle>
        <ProgressContainer>
          <ProgressHeader>
            <ProgressTitle>Meditation Time</ProgressTitle>
            <ProgressValue>140/180 min</ProgressValue>
          </ProgressHeader>
          <ProgressBarContainer>
            <ProgressBar progress={78} />
          </ProgressBarContainer>
          <ProgressText>You're 78% of the way to your weekly goal!</ProgressText>
          
          <ProgressHeader>
            <ProgressTitle>Breathing Sessions</ProgressTitle>
            <ProgressValue>8/10 sessions</ProgressValue>
          </ProgressHeader>
          <ProgressBarContainer>
            <ProgressBar progress={80} />
          </ProgressBarContainer>
          <ProgressText>Just 2 more sessions to reach your goal.</ProgressText>
        </ProgressContainer>

        <SectionTitle>Insights</SectionTitle>
        <InsightCard>
          <InsightTitle>Stress Patterns</InsightTitle>
          <InsightText>
            Your stress levels tend to peak on Mondays and Wednesdays. 
            Try scheduling short meditation breaks on these days to stay centered.
          </InsightText>
        </InsightCard>
        
        <InsightCard>
          <InsightTitle>Sleep Impact</InsightTitle>
          <InsightText>
            Using the evening meditation sessions has improved your reported sleep quality by 35% over the past two weeks.
          </InsightText>
        </InsightCard>

        <SectionTitle>Achievements</SectionTitle>
        <AchievementsContainer horizontal showsHorizontalScrollIndicator={false}>
          {achievements.map((achievement, index) => (
            <AchievementCard key={achievement.id} index={index}>
              <AchievementIcon earned={achievement.earned}>
                <Ionicons 
                  name={achievement.icon} 
                  size={24} 
                  color={achievement.earned ? '#6A5ACD' : '#bbb'} 
                />
              </AchievementIcon>
              <AchievementTitle earned={achievement.earned}>
                {achievement.title}
              </AchievementTitle>
              <AchievementProgress earned={achievement.earned}>
                {achievement.progress}
              </AchievementProgress>
            </AchievementCard>
          ))}
        </AchievementsContainer>
      </ScrollView>
    </Container>
  );
}
