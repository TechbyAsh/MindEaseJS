import React, { useState } from 'react';
import { ScrollView, TouchableOpacity, View, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styled from 'styled-components/native';
import { theme } from '../theme/theme';
import Header from '../components/Header';
import Card from '../components/Card';

const Container = styled.SafeAreaView`
  flex: 1;
  background-color: ${theme.colors.background};
`;

const SearchContainer = styled.View`
  margin: 0 ${theme.spacing.lg}px;
  margin-bottom: ${theme.spacing.lg}px;
`;

const SearchBar = styled.View`
  flex-direction: row;
  background-color: ${theme.colors.white};
  border-radius: ${theme.borderRadius.lg}px;
  padding: ${theme.spacing.md}px;
  align-items: center;
  ${theme.shadows.small}
`;

const SearchInput = styled.TextInput`
  flex: 1;
  margin-left: ${theme.spacing.sm}px;
  font-size: ${theme.typography.fontSize.md}px;
  color: ${theme.colors.text.primary};
`;

const TabContainer = styled.View`
  flex-direction: row;
  margin: 0 ${theme.spacing.lg}px ${theme.spacing.md}px ${theme.spacing.lg}px;
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

const SectionTitle = styled.Text`
  font-size: ${theme.typography.fontSize.lg}px;
  font-weight: ${theme.typography.fontWeight.semiBold};
  color: ${theme.colors.text.primary};
  margin: ${theme.spacing.lg}px ${theme.spacing.lg}px ${theme.spacing.md}px ${theme.spacing.lg}px;
`;

const GroupContainer = styled.ScrollView`
  margin-bottom: ${theme.spacing.lg}px;
`;

const GroupCard = styled(Card)`
  width: 220px;
  margin-left: ${props => (props.index === 0 ? theme.spacing.lg : theme.spacing.sm)}px;
  margin-right: ${theme.spacing.sm}px;
  padding: 0;
  overflow: hidden;
`;

const GroupImage = styled.Image`
  width: 100%;
  height: 120px;
`;

const GroupContent = styled.View`
  padding: ${theme.spacing.md}px;
`;

const GroupTitle = styled.Text`
  font-size: ${theme.typography.fontSize.md}px;
  font-weight: ${theme.typography.fontWeight.semiBold};
  color: ${theme.colors.text.primary};
  margin-bottom: ${theme.spacing.xs}px;
`;

const GroupMeta = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: ${theme.spacing.sm}px;
`;

const GroupMembers = styled.Text`
  font-size: ${theme.typography.fontSize.xs}px;
  color: ${theme.colors.text.secondary};
  margin-left: ${theme.spacing.xs}px;
`;

const GroupButton = styled.TouchableOpacity`
  background-color: ${theme.colors.secondary + '20'};
  border-radius: ${theme.borderRadius.md}px;
  padding: ${theme.spacing.xs}px ${theme.spacing.sm}px;
  align-self: flex-start;
`;

const GroupButtonText = styled.Text`
  color: ${theme.colors.secondary};
  font-size: ${theme.typography.fontSize.xs}px;
  font-weight: ${theme.typography.fontWeight.semiBold};
`;

const PostCard = styled(Card)`
  margin: 0 ${theme.spacing.lg}px ${theme.spacing.lg}px ${theme.spacing.lg}px;
  padding: 0;
  overflow: hidden;
`;

const PostHeader = styled.View`
  flex-direction: row;
  padding: ${theme.spacing.md}px;
  align-items: center;
`;

const UserAvatar = styled.Image`
  width: 40px;
  height: 40px;
  border-radius: 20px;
`;

const UserInfo = styled.View`
  margin-left: ${theme.spacing.sm}px;
  flex: 1;
`;

const UserName = styled.Text`
  font-size: ${theme.typography.fontSize.md}px;
  font-weight: ${theme.typography.fontWeight.semiBold};
  color: ${theme.colors.text.primary};
`;

const PostTime = styled.Text`
  font-size: ${theme.typography.fontSize.xs}px;
  color: ${theme.colors.text.light};
`;

const PostContent = styled.View`
  padding: 0 ${theme.spacing.md}px ${theme.spacing.md}px ${theme.spacing.md}px;
`;

const PostText = styled.Text`
  font-size: ${theme.typography.fontSize.md}px;
  color: ${theme.colors.text.primary};
  line-height: 22px;
  margin-bottom: ${props => props.hasImage ? theme.spacing.md : 0}px;
`;

const PostImage = styled.Image`
  width: 100%;
  height: 200px;
  border-radius: ${theme.borderRadius.md}px;
`;

const PostActions = styled.View`
  flex-direction: row;
  padding: ${theme.spacing.sm}px ${theme.spacing.md}px;
  border-top-width: 1px;
  border-top-color: ${theme.colors.gray.light};
`;

const ActionButton = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  margin-right: ${theme.spacing.lg}px;
`;

const ActionText = styled.Text`
  margin-left: ${theme.spacing.xs}px;
  font-size: ${theme.typography.fontSize.sm}px;
  color: ${theme.colors.text.secondary};
`;

const EmptyStateContainer = styled.View`
  align-items: center;
  justify-content: center;
  padding: ${theme.spacing.xl}px;
`;

const EmptyStateText = styled.Text`
  font-size: ${theme.typography.fontSize.md}px;
  color: ${theme.colors.text.secondary};
  text-align: center;
  margin-top: ${theme.spacing.md}px;
`;

const groups = [
  {
    id: 1,
    name: 'Anxiety Support',
    members: 1243,
    image: 'https://images.unsplash.com/photo-1516302752625-fcc3c50ae61f?w=800&auto=format&fit=crop'
  },
  {
    id: 2,
    name: 'Meditation Daily',
    members: 986,
    image: 'https://images.unsplash.com/photo-1536623975707-c4b3b2af565d?w=800&auto=format&fit=crop'
  },
  {
    id: 3,
    name: 'Work-Life Balance',
    members: 562,
    image: 'https://images.unsplash.com/photo-1499209974431-9dddcece7f88?w=800&auto=format&fit=crop'
  }
];

const posts = [
  {
    id: 1,
    user: {
      name: 'Sarah Johnson',
      avatar: 'https://randomuser.me/api/portraits/women/12.jpg'
    },
    time: '2 hours ago',
    content: "Just completed a 10-day meditation streak! I'm noticing such a difference in my anxiety levels throughout the day. Has anyone else experienced significant improvements with consistent practice?",
    likes: 24,
    comments: 8
  },
  {
    id: 2,
    user: {
      name: 'Michael Chen',
      avatar: 'https://randomuser.me/api/portraits/men/22.jpg'
    },
    time: '4 hours ago',
    content: "Found this beautiful spot for my morning meditation. Nature sounds make such a difference!",
    image: 'https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?w=800&auto=format&fit=crop',
    likes: 47,
    comments: 12
  }
];

export default function CommunityScreen() {
  const [activeTab, setActiveTab] = useState('feed');
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <Container>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Header 
          title="Community"
          subtitle="Connect with others on the same journey"
          rightIcon="notifications-outline"
          onRightPress={() => {}}
        />

        <SearchContainer>
          <SearchBar>
            <Ionicons name="search-outline" size={20} color={theme.colors.text.light} />
            <SearchInput 
              placeholder="Search communities" 
              value={searchQuery}
              onChangeText={setSearchQuery}
              placeholderTextColor={theme.colors.text.light}
            />
          </SearchBar>
        </SearchContainer>

        <TabContainer>
          <Tab active={activeTab === 'feed'} onPress={() => setActiveTab('feed')}>
            <TabText active={activeTab === 'feed'}>Feed</TabText>
          </Tab>
          <Tab active={activeTab === 'groups'} onPress={() => setActiveTab('groups')}>
            <TabText active={activeTab === 'groups'}>Groups</TabText>
          </Tab>
          <Tab active={activeTab === 'events'} onPress={() => setActiveTab('events')}>
            <TabText active={activeTab === 'events'}>Events</TabText>
          </Tab>
        </TabContainer>

        {activeTab === 'feed' && (
          <>
            <SectionTitle>Popular Groups</SectionTitle>
            <GroupContainer horizontal showsHorizontalScrollIndicator={false}>
              {groups.map((group, index) => (
                <GroupCard key={group.id} index={index}>
                  <GroupImage source={{ uri: group.image }} />
                  <GroupContent>
                    <GroupTitle>{group.name}</GroupTitle>
                    <GroupMeta>
                      <Ionicons name="people-outline" size={14} color={theme.colors.text.secondary} />
                      <GroupMembers>{group.members} members</GroupMembers>
                    </GroupMeta>
                    <GroupButton>
                      <GroupButtonText>Join</GroupButtonText>
                    </GroupButton>
                  </GroupContent>
                </GroupCard>
              ))}
            </GroupContainer>

            <SectionTitle>Recent Posts</SectionTitle>
            {posts.map(post => (
              <PostCard key={post.id}>
                <PostHeader>
                  <UserAvatar source={{ uri: post.user.avatar }} />
                  <UserInfo>
                    <UserName>{post.user.name}</UserName>
                    <PostTime>{post.time}</PostTime>
                  </UserInfo>
                </PostHeader>
                <PostContent>
                  <PostText hasImage={post.image}>{post.content}</PostText>
                  {post.image && (
                    <PostImage source={{ uri: post.image }} />
                  )}
                </PostContent>
                <PostActions>
                  <ActionButton>
                    <Ionicons name="heart-outline" size={20} color={theme.colors.text.secondary} />
                    <ActionText>{post.likes}</ActionText>
                  </ActionButton>
                  <ActionButton>
                    <Ionicons name="chatbubble-outline" size={20} color={theme.colors.text.secondary} />
                    <ActionText>{post.comments}</ActionText>
                  </ActionButton>
                  <ActionButton>
                    <Ionicons name="share-outline" size={20} color={theme.colors.text.secondary} />
                  </ActionButton>
                </PostActions>
              </PostCard>
            ))}
          </>
        )}

        {activeTab === 'groups' && (
          <EmptyStateContainer>
            <Ionicons name="people" size={60} color={theme.colors.tertiary} />
            <EmptyStateText>
              Groups feature is coming soon!{'\n'}
              Stay tuned for updates.
            </EmptyStateText>
          </EmptyStateContainer>
        )}

        {activeTab === 'events' && (
          <EmptyStateContainer>
            <Ionicons name="calendar" size={60} color={theme.colors.tertiary} />
            <EmptyStateText>
              Events feature is coming soon!{'\n'}
              Stay tuned for updates.
            </EmptyStateText>
          </EmptyStateContainer>
        )}
      </ScrollView>
    </Container>
  );
}
