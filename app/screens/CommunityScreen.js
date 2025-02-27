
import React, { useState } from 'react';
import { ScrollView, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styled from 'styled-components/native';

const Container = styled.SafeAreaView`
  flex: 1;
  background-color: #f8f8ff;
`;

const Header = styled.View`
  padding: 20px;
`;

const Title = styled.Text`
  font-size: 24px;
  font-weight: bold;
  color: #333;
  margin-bottom: 5px;
`;

const SubTitle = styled.Text`
  font-size: 16px;
  color: #666;
  margin-bottom: 15px;
`;

const SearchBar = styled.View`
  flex-direction: row;
  background-color: white;
  border-radius: 20px;
  padding: 10px 15px;
  align-items: center;
  margin-bottom: 15px;
`;

const SearchInput = styled.TextInput`
  flex: 1;
  margin-left: 10px;
  font-size: 16px;
  color: #333;
`;

const TabContainer = styled.View`
  flex-direction: row;
  margin: 0 20px 15px 20px;
  border-bottom-width: 1px;
  border-bottom-color: #eee;
`;

const Tab = styled.TouchableOpacity`
  padding: 10px 20px;
  border-bottom-width: 2px;
  border-bottom-color: ${props => props.active ? '#6A5ACD' : 'transparent'};
`;

const TabText = styled.Text`
  font-size: 16px;
  font-weight: ${props => props.active ? 'bold' : 'normal'};
  color: ${props => props.active ? '#6A5ACD' : '#666'};
`;

const SectionTitle = styled.Text`
  font-size: 18px;
  font-weight: bold;
  margin: 15px 20px 10px 20px;
  color: #333;
`;

const GroupContainer = styled.ScrollView`
  margin-bottom: 15px;
`;

const GroupCard = styled.TouchableOpacity`
  width: 200px;
  background-color: white;
  border-radius: 15px;
  margin-left: ${props => (props.index === 0 ? '20px' : '10px')};
  margin-right: 10px;
  padding-bottom: 15px;
  overflow: hidden;
  elevation: 2;
  shadow-opacity: 0.1;
  shadow-radius: 3px;
  shadow-color: #000;
  shadow-offset: 0px 2px;
`;

const GroupImage = styled.Image`
  width: 100%;
  height: 100px;
`;

const GroupContent = styled.View`
  padding: 10px;
`;

const GroupTitle = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: #333;
  margin-bottom: 5px;
`;

const GroupMeta = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 8px;
`;

const GroupMembers = styled.Text`
  font-size: 12px;
  color: #666;
  margin-left: 5px;
`;

const GroupButton = styled.TouchableOpacity`
  background-color: #f0f0ff;
  border-radius: 15px;
  padding: 5px 10px;
  align-self: flex-start;
`;

const GroupButtonText = styled.Text`
  color: #6A5ACD;
  font-size: 12px;
  font-weight: bold;
`;

const PostCard = styled.View`
  background-color: white;
  border-radius: 15px;
  margin: 0 20px 15px 20px;
  overflow: hidden;
  elevation: 2;
  shadow-opacity: 0.1;
  shadow-radius: 3px;
  shadow-color: #000;
  shadow-offset: 0px 2px;
`;

const PostHeader = styled.View`
  flex-direction: row;
  padding: 15px;
  align-items: center;
`;

const UserAvatar = styled.Image`
  width: 40px;
  height: 40px;
  border-radius: 20px;
`;

const UserInfo = styled.View`
  margin-left: 10px;
  flex: 1;
`;

const UserName = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: #333;
`;

const PostTime = styled.Text`
  font-size: 12px;
  color: #999;
`;

const PostContent = styled.View`
  padding: 0 15px 15px 15px;
`;

const PostText = styled.Text`
  font-size: 14px;
  color: #333;
  line-height: 20px;
  margin-bottom: ${props => props.hasImage ? '10px' : '0'};
`;

const PostImage = styled.Image`
  width: 100%;
  height: 200px;
  border-radius: 10px;
`;

const PostActions = styled.View`
  flex-direction: row;
  padding: 10px 15px;
  border-top-width: 1px;
  border-top-color: #eee;
`;

const ActionButton = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  margin-right: 20px;
`;

const ActionText = styled.Text`
  margin-left: 5px;
  font-size: 14px;
  color: #666;
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
        <Header>
          <Title>Community</Title>
          <SubTitle>Connect with others on the same journey</SubTitle>
          <SearchBar>
            <Ionicons name="search-outline" size={20} color="#999" />
            <SearchInput 
              placeholder="Search communities" 
              value={searchQuery}
              onChangeText={setSearchQuery}
              placeholderTextColor="#999"
            />
          </SearchBar>
        </Header>

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
                      <Ionicons name="people-outline" size={14} color="#666" />
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
                    <Ionicons name="heart-outline" size={20} color="#666" />
                    <ActionText>{post.likes}</ActionText>
                  </ActionButton>
                  <ActionButton>
                    <Ionicons name="chatbubble-outline" size={20} color="#666" />
                    <ActionText>{post.comments}</ActionText>
                  </ActionButton>
                  <ActionButton>
                    <Ionicons name="share-outline" size={20} color="#666" />
                  </ActionButton>
                </PostActions>
              </PostCard>
            ))}
          </>
        )}

        {activeTab === 'groups' && (
          <SectionTitle>Coming soon: Groups feature</SectionTitle>
        )}

        {activeTab === 'events' && (
          <SectionTitle>Coming soon: Events feature</SectionTitle>
        )}
      </ScrollView>
    </Container>
  );
}
