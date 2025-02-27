
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
`;

const SectionTitle = styled.Text`
  font-size: 18px;
  font-weight: bold;
  margin: 15px 20px;
  color: #333;
`;

const RecommendedContainer = styled.ScrollView`
  margin-bottom: 15px;
`;

const MeditationCard = styled.TouchableOpacity`
  width: 300px;
  height: 180px;
  margin-left: ${props => (props.index === 0 ? '20px' : '10px')};
  margin-right: 10px;
  border-radius: 15px;
  overflow: hidden;
  background-color: #fff;
  elevation: 3;
  shadow-opacity: 0.1;
  shadow-radius: 5px;
  shadow-color: #000;
  shadow-offset: 0px 3px;
`;

const CardImage = styled.Image`
  width: 100%;
  height: 60%;
`;

const CardOverlay = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 60%;
  background-color: rgba(0, 0, 0, 0.2);
  justify-content: flex-end;
  padding: 10px;
`;

const CardTitle = styled.Text`
  color: white;
  font-size: 18px;
  font-weight: bold;
`;

const CardContent = styled.View`
  padding: 10px;
  flex: 1;
  justify-content: space-between;
`;

const CardDescription = styled.Text`
  font-size: 14px;
  color: #666;
`;

const CardFooter = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const Duration = styled.Text`
  font-size: 12px;
  color: #999;
`;

const CategoryContainer = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  padding: 0 15px;
  justify-content: space-between;
  margin-bottom: 15px;
`;

const CategoryButton = styled.TouchableOpacity`
  width: 48%;
  height: 70px;
  background-color: ${props => props.color || '#fff'};
  border-radius: 12px;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
  elevation: 2;
  shadow-opacity: 0.1;
  shadow-radius: 3px;
  shadow-color: #000;
  shadow-offset: 0px 2px;
`;

const CategoryText = styled.Text`
  font-size: 14px;
  font-weight: bold;
  color: #333;
  margin-top: 5px;
`;

const ListContainer = styled.View`
  padding: 0 20px;
`;

const ListItem = styled.TouchableOpacity`
  flex-direction: row;
  padding: 15px 0;
  border-bottom-width: 1px;
  border-bottom-color: #eee;
  align-items: center;
`;

const ListItemImage = styled.Image`
  width: 70px;
  height: 70px;
  border-radius: 10px;
`;

const ListItemContent = styled.View`
  flex: 1;
  margin-left: 15px;
`;

const ListItemTitle = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: #333;
`;

const ListItemDescription = styled.Text`
  font-size: 14px;
  color: #666;
  margin: 5px 0;
`;

const ListItemMeta = styled.View`
  flex-direction: row;
  align-items: center;
`;

const ListItemDuration = styled.Text`
  font-size: 12px;
  color: #999;
  margin-right: 15px;
`;

const ListItemRating = styled.View`
  flex-direction: row;
  align-items: center;
`;

const RatingText = styled.Text`
  font-size: 12px;
  color: #6A5ACD;
  margin-left: 3px;
`;

const recommendedMeditations = [
  {
    id: 1,
    title: 'Calm Mind',
    description: 'A meditation for anxiety relief',
    duration: '10 min',
    image: 'https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?w=800&auto=format&fit=crop'
  },
  {
    id: 2,
    title: 'Morning Light',
    description: 'Start your day with clarity',
    duration: '5 min',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&auto=format&fit=crop'
  },
  {
    id: 3,
    title: 'Deep Rest',
    description: 'Prepare for a restful sleep',
    duration: '15 min',
    image: 'https://images.unsplash.com/photo-1511295842406-238922ece098?w=800&auto=format&fit=crop'
  }
];

const categories = [
  { id: 1, name: 'Sleep', icon: 'moon-outline', color: '#e6e6fa' },
  { id: 2, name: 'Stress', icon: 'water-outline', color: '#e0ffff' },
  { id: 3, name: 'Anxiety', icon: 'heart-outline', color: '#fff0f5' },
  { id: 4, name: 'Focus', icon: 'bulb-outline', color: '#f0f8ff' }
];

const allMeditations = [
  {
    id: 1,
    title: 'Body Scan Relaxation',
    description: 'Release tension in your body',
    duration: '12 min',
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&auto=format&fit=crop'
  },
  {
    id: 2,
    title: 'Loving Kindness',
    description: 'Cultivate compassion and love',
    duration: '10 min',
    rating: 4.6,
    image: 'https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=800&auto=format&fit=crop'
  },
  {
    id: 3,
    title: 'Work Stress Relief',
    description: 'Quick meditation for busy days',
    duration: '5 min',
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&auto=format&fit=crop'
  }
];

export default function MeditationScreen() {
  const [selectedCategory, setSelectedCategory] = useState(null);

  return (
    <Container>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Header>
          <Title>Meditation</Title>
          <SubTitle>Find peace in the present moment</SubTitle>
        </Header>

        <SectionTitle>Recommended for You</SectionTitle>
        <RecommendedContainer horizontal showsHorizontalScrollIndicator={false}>
          {recommendedMeditations.map((meditation, index) => (
            <MeditationCard key={meditation.id} index={index}>
              <CardImage source={{ uri: meditation.image }} />
              <CardOverlay>
                <CardTitle>{meditation.title}</CardTitle>
              </CardOverlay>
              <CardContent>
                <CardDescription>{meditation.description}</CardDescription>
                <CardFooter>
                  <Duration>{meditation.duration}</Duration>
                  <Ionicons name="play-circle" size={24} color="#6A5ACD" />
                </CardFooter>
              </CardContent>
            </MeditationCard>
          ))}
        </RecommendedContainer>

        <SectionTitle>Categories</SectionTitle>
        <CategoryContainer>
          {categories.map(category => (
            <CategoryButton 
              key={category.id} 
              color={category.color}
              onPress={() => setSelectedCategory(category.id)}
            >
              <Ionicons name={category.icon} size={24} color="#6A5ACD" />
              <CategoryText>{category.name}</CategoryText>
            </CategoryButton>
          ))}
        </CategoryContainer>

        <SectionTitle>All Meditations</SectionTitle>
        <ListContainer>
          {allMeditations && allMeditations.map(meditation => (
            <ListItem key={meditation.id}>
              <ListItemImage source={{ uri: meditation.image }} />
              <ListItemContent>
                <ListItemTitle>{meditation.title}</ListItemTitle>
                <ListItemDescription>{meditation.description}</ListItemDescription>
                <ListItemMeta>
                  <ListItemDuration>{meditation.duration}</ListItemDuration>
                  <ListItemRating>
                    <Ionicons name="star" size={14} color="#6A5ACD" />
                    <RatingText>{meditation.rating}</RatingText>
                  </ListItemRating>
                </ListItemMeta>
              </ListItemContent>
              <Ionicons name="play-circle" size={28} color="#6A5ACD" />
            </ListItem>
          ))}
        </ListContainer>
      </ScrollView>
    </Container>
  );
}
