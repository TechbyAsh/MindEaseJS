import React, { useState } from 'react';
import { ScrollView, View, Image, TouchableOpacity, Alert } from 'react-native';
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

const ProfileHeader = styled.View`
  align-items: center;
  padding: ${theme.spacing.lg}px;
`;

const ProfileImageContainer = styled.View`
  position: relative;
  margin-bottom: ${theme.spacing.md}px;
`;

const ProfileImage = styled.Image`
  width: 100px;
  height: 100px;
  border-radius: 50px;
  border-width: 3px;
  border-color: ${theme.colors.secondary};
`;

const EditButton = styled.TouchableOpacity`
  position: absolute;
  bottom: 0;
  right: 0;
  background-color: ${theme.colors.primary};
  width: 32px;
  height: 32px;
  border-radius: 16px;
  align-items: center;
  justify-content: center;
  ${theme.shadows.small}
`;

const UserName = styled.Text`
  font-size: ${theme.typography.fontSize.xl}px;
  font-weight: ${theme.typography.fontWeight.bold};
  color: ${theme.colors.text.primary};
  margin-bottom: ${theme.spacing.xs}px;
`;

const UserEmail = styled.Text`
  font-size: ${theme.typography.fontSize.md}px;
  color: ${theme.colors.text.secondary};
  margin-bottom: ${theme.spacing.md}px;
`;

const StatsContainer = styled.View`
  flex-direction: row;
  justify-content: space-around;
  width: 100%;
  margin-bottom: ${theme.spacing.lg}px;
`;

const StatItem = styled.View`
  align-items: center;
`;

const StatValue = styled.Text`
  font-size: ${theme.typography.fontSize.xl}px;
  font-weight: ${theme.typography.fontWeight.bold};
  color: ${theme.colors.primary};
`;

const StatLabel = styled.Text`
  font-size: ${theme.typography.fontSize.sm}px;
  color: ${theme.colors.text.secondary};
`;

const SectionTitle = styled.Text`
  font-size: ${theme.typography.fontSize.lg}px;
  font-weight: ${theme.typography.fontWeight.semiBold};
  color: ${theme.colors.text.primary};
  margin: ${theme.spacing.lg}px ${theme.spacing.lg}px ${theme.spacing.md}px ${theme.spacing.lg}px;
`;

const ProgressContainer = styled.View`
  padding: 0 ${theme.spacing.lg}px;
`;

const ProgressCard = styled(Card)`
  margin-bottom: ${theme.spacing.md}px;
  padding: ${theme.spacing.md}px;
`;

const ProgressHeader = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${theme.spacing.sm}px;
`;

const ProgressTitle = styled.Text`
  font-size: ${theme.typography.fontSize.md}px;
  font-weight: ${theme.typography.fontWeight.semiBold};
  color: ${theme.colors.text.primary};
`;

const ProgressDate = styled.Text`
  font-size: ${theme.typography.fontSize.xs}px;
  color: ${theme.colors.text.light};
`;

const ProgressBarContainer = styled.View`
  height: 8px;
  background-color: ${theme.colors.gray.light};
  border-radius: 4px;
  margin: ${theme.spacing.sm}px 0;
  overflow: hidden;
`;

const ProgressBar = styled.View`
  height: 100%;
  width: ${props => props.progress}%;
  background-color: ${props => props.color || theme.colors.secondary};
  border-radius: 4px;
`;

const ProgressMeta = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

const ProgressMetaText = styled.Text`
  font-size: ${theme.typography.fontSize.xs}px;
  color: ${theme.colors.text.secondary};
`;

const TabContainer = styled.View`
  flex-direction: row;
  margin: 0 ${theme.spacing.lg}px;
  border-bottom-width: 1px;
  border-bottom-color: ${theme.colors.gray.medium};
`;

const Tab = styled.TouchableOpacity`
  padding: ${theme.spacing.md}px ${theme.spacing.lg}px;
  border-bottom-width: 2px;
  border-bottom-color: ${props => props.active ? theme.colors.secondary : 'transparent'};
`;

const TabText = styled.Text`
  font-size: ${theme.typography.fontSize.md}px;
  font-weight: ${props => props.active ? theme.typography.fontWeight.semiBold : theme.typography.fontWeight.regular};
  color: ${props => props.active ? theme.colors.secondary : theme.colors.text.secondary};
`;

const AchievementContainer = styled.ScrollView`
  margin: ${theme.spacing.md}px 0;
`;

const AchievementCard = styled(Card)`
  width: 140px;
  padding: ${theme.spacing.md}px;
  align-items: center;
  margin-left: ${props => (props.index === 0 ? theme.spacing.lg : theme.spacing.sm)}px;
  margin-right: ${theme.spacing.sm}px;
`;

const AchievementIcon = styled.View`
  width: 60px;
  height: 60px;
  border-radius: 30px;
  background-color: ${props => props.color || theme.colors.card.meditation};
  align-items: center;
  justify-content: center;
  margin-bottom: ${theme.spacing.sm}px;
`;

const AchievementTitle = styled.Text`
  font-size: ${theme.typography.fontSize.sm}px;
  font-weight: ${theme.typography.fontWeight.semiBold};
  color: ${theme.colors.text.primary};
  text-align: center;
  margin-bottom: ${theme.spacing.xs}px;
`;

const AchievementDate = styled.Text`
  font-size: ${theme.typography.fontSize.xs}px;
  color: ${theme.colors.text.light};
  text-align: center;
`;

const SettingsContainer = styled.View`
  padding: 0 ${theme.spacing.lg}px;
`;

const SettingsItem = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  padding: ${theme.spacing.md}px 0;
  border-bottom-width: 1px;
  border-bottom-color: ${theme.colors.gray.light};
`;

const SettingsIcon = styled.View`
  width: 40px;
  height: 40px;
  border-radius: 20px;
  background-color: ${props => props.color || theme.colors.card.meditation + '40'};
  align-items: center;
  justify-content: center;
  margin-right: ${theme.spacing.md}px;
`;

const SettingsText = styled.Text`
  font-size: ${theme.typography.fontSize.md}px;
  color: ${theme.colors.text.primary};
  flex: 1;
`;

const achievements = [
  {
    id: 1,
    title: '7-Day Streak',
    date: 'Jun 15, 2025',
    icon: 'flame-outline',
    color: theme.colors.card.meditation,
  },
  {
    id: 2,
    title: 'Meditation Master',
    date: 'Jun 10, 2025',
    icon: 'leaf-outline',
    color: theme.colors.card.breathing,
  },
  {
    id: 3,
    title: 'Community Star',
    date: 'Jun 5, 2025',
    icon: 'star-outline',
    color: theme.colors.card.community,
  },
  {
    id: 4,
    title: 'Early Bird',
    date: 'May 30, 2025',
    icon: 'sunny-outline',
    color: theme.colors.card.progress,
  },
];

const settingsItems = [
  {
    id: 'account',
    title: 'Account Settings',
    icon: 'person-outline',
    color: theme.colors.card.meditation + '40',
  },
  {
    id: 'notifications',
    title: 'Notifications',
    icon: 'notifications-outline',
    color: theme.colors.card.breathing + '40',
  },
  {
    id: 'privacy',
    title: 'Privacy & Security',
    icon: 'shield-outline',
    color: theme.colors.card.community + '40',
  },
  {
    id: 'help',
    title: 'Help & Support',
    icon: 'help-circle-outline',
    color: theme.colors.card.progress + '40',
  },
  {
    id: 'about',
    title: 'About MindEase',
    icon: 'information-circle-outline',
    color: theme.colors.tertiary + '40',
  },
  {
    id: 'logout',
    title: 'Logout',
    icon: 'log-out-outline',
    color: theme.colors.error + '40',
  },
];

export default function ProfileScreen({ navigation }) {
  const { logout } = useAuth();
  const [activeTab, setActiveTab] = useState('progress');
  const [isLoading, setIsLoading] = useState(false);

  return (
    <Container>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Header 
          title="Profile"
          rightIcon="settings-outline"
          onRightPress={() => {}}
        />

        <ProfileHeader>
          <ProfileImageContainer>
            <ProfileImage source={{ uri: 'https://randomuser.me/api/portraits/women/32.jpg' }} />
            <EditButton>
              <Ionicons name="pencil" size={16} color="white" />
            </EditButton>
          </ProfileImageContainer>
          <UserName>Sarina Johnson</UserName>
          <UserEmail>sarina.johnson@example.com</UserEmail>

          <StatsContainer>
            <StatItem>
              <StatValue>23</StatValue>
              <StatLabel>Days</StatLabel>
            </StatItem>
            <StatItem>
              <StatValue>7</StatValue>
              <StatLabel>Streak</StatLabel>
            </StatItem>
            <StatItem>
              <StatValue>12</StatValue>
              <StatLabel>Hours</StatLabel>
            </StatItem>
          </StatsContainer>

          <Button 
            title="Edit Profile"
            variant="outlined"
            size="medium"
            onPress={() => {}}
          />
        </ProfileHeader>

        <TabContainer>
          <Tab active={activeTab === 'progress'} onPress={() => setActiveTab('progress')}>
            <TabText active={activeTab === 'progress'}>Progress</TabText>
          </Tab>
          <Tab active={activeTab === 'achievements'} onPress={() => setActiveTab('achievements')}>
            <TabText active={activeTab === 'achievements'}>Achievements</TabText>
          </Tab>
          <Tab active={activeTab === 'settings'} onPress={() => setActiveTab('settings')}>
            <TabText active={activeTab === 'settings'}>Settings</TabText>
          </Tab>
        </TabContainer>

        {activeTab === 'progress' && (
          <ProgressContainer>
            <SectionTitle>Weekly Progress</SectionTitle>
            
            <ProgressCard>
              <ProgressHeader>
                <ProgressTitle>Meditation</ProgressTitle>
                <ProgressDate>This week</ProgressDate>
              </ProgressHeader>
              <ProgressBarContainer>
                <ProgressBar progress={75} color={theme.colors.card.meditation} />
              </ProgressBarContainer>
              <ProgressMeta>
                <ProgressMetaText>Goal: 20 sessions</ProgressMetaText>
                <ProgressMetaText>15/20 completed</ProgressMetaText>
              </ProgressMeta>
            </ProgressCard>
            
            <ProgressCard>
              <ProgressHeader>
                <ProgressTitle>Breathing Exercises</ProgressTitle>
                <ProgressDate>This week</ProgressDate>
              </ProgressHeader>
              <ProgressBarContainer>
                <ProgressBar progress={60} color={theme.colors.card.breathing} />
              </ProgressBarContainer>
              <ProgressMeta>
                <ProgressMetaText>Goal: 10 sessions</ProgressMetaText>
                <ProgressMetaText>6/10 completed</ProgressMetaText>
              </ProgressMeta>
            </ProgressCard>
            
            <ProgressCard>
              <ProgressHeader>
                <ProgressTitle>Community Engagement</ProgressTitle>
                <ProgressDate>This week</ProgressDate>
              </ProgressHeader>
              <ProgressBarContainer>
                <ProgressBar progress={40} color={theme.colors.card.community} />
              </ProgressBarContainer>
              <ProgressMeta>
                <ProgressMetaText>Goal: 5 interactions</ProgressMetaText>
                <ProgressMetaText>2/5 completed</ProgressMetaText>
              </ProgressMeta>
            </ProgressCard>
          </ProgressContainer>
        )}

        {activeTab === 'achievements' && (
          <>
            <SectionTitle>Recent Achievements</SectionTitle>
            <AchievementContainer horizontal showsHorizontalScrollIndicator={false}>
              {achievements.map((achievement, index) => (
                <AchievementCard key={achievement.id} index={index}>
                  <AchievementIcon color={achievement.color}>
                    <Ionicons name={achievement.icon} size={30} color="white" />
                  </AchievementIcon>
                  <AchievementTitle>{achievement.title}</AchievementTitle>
                  <AchievementDate>{achievement.date}</AchievementDate>
                </AchievementCard>
              ))}
            </AchievementContainer>
            
            <SectionTitle>Upcoming Achievements</SectionTitle>
            <ProgressContainer>
              <ProgressCard>
                <ProgressHeader>
                  <ProgressTitle>30-Day Streak</ProgressTitle>
                </ProgressHeader>
                <ProgressBarContainer>
                  <ProgressBar progress={23} color={theme.colors.tertiary} />
                </ProgressBarContainer>
                <ProgressMeta>
                  <ProgressMetaText>7/30 days completed</ProgressMetaText>
                </ProgressMeta>
              </ProgressCard>
              
              <ProgressCard>
                <ProgressHeader>
                  <ProgressTitle>Meditation Guru</ProgressTitle>
                </ProgressHeader>
                <ProgressBarContainer>
                  <ProgressBar progress={60} color={theme.colors.tertiary} />
                </ProgressBarContainer>
                <ProgressMeta>
                  <ProgressMetaText>30/50 sessions completed</ProgressMetaText>
                </ProgressMeta>
              </ProgressCard>
            </ProgressContainer>
          </>
        )}

        {activeTab === 'settings' && (
          <SettingsContainer>
            <SectionTitle>Settings</SectionTitle>
            {settingsItems.map(item => (
              <SettingsItem 
                key={item.id} 
                onPress={() => {
                  if (item.id === 'logout') {
                    Alert.alert(
                      'Logout',
                      'Are you sure you want to logout?',
                      [
                        {
                          text: 'Cancel',
                          style: 'cancel',
                        },
                        {
                          text: 'Logout',
                          style: 'destructive',
                          onPress: async () => {
                            setIsLoading(true);
                            try {
                              await logout();
                              // Navigation will be handled by RootNavigator based on auth state
                            } catch (error) {
                              console.error('Logout error:', error);
                              Alert.alert('Error', 'Failed to logout. Please try again.');
                            } finally {
                              setIsLoading(false);
                            }
                          },
                        },
                      ],
                      { cancelable: true }
                    );
                  } else {
                    // Handle other settings items
                  }
                }}
                disabled={isLoading && item.id === 'logout'}
              >
                <SettingsIcon color={item.color}>
                  <Ionicons name={item.icon} size={20} color={item.id === 'logout' ? theme.colors.error : theme.colors.primary} />
                </SettingsIcon>
                <SettingsText style={item.id === 'logout' ? { color: theme.colors.error } : {}}>
                  {item.title}
                  {isLoading && item.id === 'logout' ? ' (Logging out...)' : ''}
                </SettingsText>
                <Ionicons name="chevron-forward" size={20} color={theme.colors.text.light} />
              </SettingsItem>
            ))}
          </SettingsContainer>
        )}
      </ScrollView>
    </Container>
  );
}
