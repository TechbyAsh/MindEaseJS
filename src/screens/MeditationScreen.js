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

const SectionTitle = styled.Text`
  font-size: ${theme.typography.fontSize.lg}px;
  font-weight: ${theme.typography.fontWeight.semiBold};
  color: ${theme.colors.text.primary};
  margin: ${theme.spacing.lg}px ${theme.spacing.lg}px ${theme.spacing.md}px ${theme.spacing.lg}px;
`;

const RecommendedContainer = styled.ScrollView`
  margin-bottom: ${theme.spacing.md}px;
`;

const MeditationCard = styled(Card)`
  width: 280px;
  height: 200px;
  margin-left: ${props => (props.index === 0 ? theme.spacing.lg : theme.spacing.sm)}px;
  margin-right: ${theme.spacing.sm}px;
  padding: 0;
  overflow: hidden;
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
  padding: ${theme.spacing.md}px;
`;

const CardTitle = styled.Text`
  color: ${theme.colors.white};
  font-size: ${theme.typography.fontSize.lg}px;
  font-weight: ${theme.typography.fontWeight.bold};
`;

const CardContent = styled.View`
  padding: ${theme.spacing.md}px;
  flex: 1;
  justify-content: space-between;
`;

const CardDescription = styled.Text`
  font-size: ${theme.typography.fontSize.sm}px;
  color: ${theme.colors.text.secondary};
`;

const CardFooter = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const Duration = styled.Text`
  font-size: ${theme.typography.fontSize.xs}px;
  color: ${theme.colors.text.light};
`;

const CategoryContainer = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  padding: 0 ${theme.spacing.lg}px;
  justify-content: space-between;
  margin-bottom: ${theme.spacing.lg}px;
`;

const CategoryButton = styled.TouchableOpacity`
  width: 48%;
  height: 80px;
  background-color: ${props => props.selected 
    ? theme.colors.secondary + '20'
    : props.color || theme.colors.white};
  border-radius: ${theme.borderRadius.lg}px;
  justify-content: center;
  align-items: center;
  margin-bottom: ${theme.spacing.md}px;
  ${theme.shadows.small}
  border-width: ${props => props.selected ? 1 : 0}px;
  border-color: ${theme.colors.secondary};
`;

const CategoryText = styled.Text`
  font-size: ${theme.typography.fontSize.md}px;
  font-weight: ${props => props.selected 
    ? theme.typography.fontWeight.semiBold 
    : theme.typography.fontWeight.medium};
  color: ${props => props.selected 
    ? theme.colors.secondary 
    : theme.colors.text.primary};
  margin-top: ${theme.spacing.xs}px;
`;

const ListContainer = styled.View`
  padding: 0 ${theme.spacing.lg}px;
`;

const ListItem = styled(Card)`
  flex-direction: row;
  padding: ${theme.spacing.md}px;
  align-items: center;
  margin-bottom: ${theme.spacing.md}px;
`;

const ListItemImage = styled.Image`
  width: 80px;
  height: 80px;
  border-radius: ${theme.borderRadius.md}px;
`;

const ListItemContent = styled.View`
  flex: 1;
  margin-left: ${theme.spacing.md}px;
`;

const ListItemTitle = styled.Text`
  font-size: ${theme.typography.fontSize.md}px;
  font-weight: ${theme.typography.fontWeight.semiBold};
  color: ${theme.colors.text.primary};
`;

const ListItemDescription = styled.Text`
  font-size: ${theme.typography.fontSize.sm}px;
  color: ${theme.colors.text.secondary};
  margin: ${theme.spacing.xs}px 0;
`;

const ListItemMeta = styled.View`
  flex-direction: row;
  align-items: center;
`;

const ListItemDuration = styled.Text`
  font-size: ${theme.typography.fontSize.xs}px;
  color: ${theme.colors.text.light};
  margin-right: ${theme.spacing.md}px;
`;

const ListItemRating = styled.View`
  flex-direction: row;
  align-items: center;
`;

const RatingText = styled.Text`
  font-size: ${theme.typography.fontSize.xs}px;
  color: ${theme.colors.secondary};
  margin-left: ${theme.spacing.xs}px;
`;

const PlayButton = styled.TouchableOpacity`
  width: 40px;
  height: 40px;
  border-radius: 20px;
  background-color: ${theme.colors.secondary + '20'};
  align-items: center;
  justify-content: center;
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
  { id: 1, name: 'Sleep', icon: 'moon-outline', color: theme.colors.card.meditation },
  { id: 2, name: 'Stress', icon: 'water-outline', color: theme.colors.card.breathing },
  { id: 3, name: 'Anxiety', icon: 'heart-outline', color: theme.colors.card.community },
  { id: 4, name: 'Focus', icon: 'bulb-outline', color: theme.colors.card.progress }
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
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <Container>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Header 
          title="Meditation"
          subtitle="Find peace in the present moment"
          leftIcon="arrow-back"
          onLeftPress={() => {}}
        />

        <SearchContainer>
          <SearchBar>
            <Ionicons name="search-outline" size={20} color={theme.colors.text.light} />
            <SearchInput 
              placeholder="Search meditations" 
              value={searchQuery}
              onChangeText={setSearchQuery}
              placeholderTextColor={theme.colors.text.light}
            />
          </SearchBar>
        </SearchContainer>

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
                  <Ionicons name="play-circle" size={24} color={theme.colors.secondary} />
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
              selected={selectedCategory === category.id}
              onPress={() => setSelectedCategory(category.id === selectedCategory ? null : category.id)}
            >
              <Ionicons 
                name={category.icon} 
                size={24} 
                color={selectedCategory === category.id ? theme.colors.secondary : theme.colors.primary} 
              />
              <CategoryText selected={selectedCategory === category.id}>{category.name}</CategoryText>
            </CategoryButton>
          ))}
        </CategoryContainer>

        <SectionTitle>All Meditations</SectionTitle>
        <ListContainer>
          {allMeditations.map(meditation => (
            <ListItem key={meditation.id}>
              <ListItemImage source={{ uri: meditation.image }} />
              <ListItemContent>
                <ListItemTitle>{meditation.title}</ListItemTitle>
                <ListItemDescription>{meditation.description}</ListItemDescription>
                <ListItemMeta>
                  <ListItemDuration>{meditation.duration}</ListItemDuration>
                  <ListItemRating>
                    <Ionicons name="star" size={14} color={theme.colors.secondary} />
                    <RatingText>{meditation.rating}</RatingText>
                  </ListItemRating>
                </ListItemMeta>
              </ListItemContent>
              <PlayButton>
                <Ionicons name="play" size={20} color={theme.colors.secondary} />
              </PlayButton>
            </ListItem>
          ))}
        </ListContainer>
      </ScrollView>
    </Container>
  );
}
