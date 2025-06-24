import React, { useState, useEffect } from 'react';
import { ScrollView, TouchableOpacity, View, TextInput, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styled from 'styled-components/native';
import { theme } from '../theme/theme';
import Header from '../components/Header';
import Card from '../components/Card';
import AsyncStorage from '@react-native-async-storage/async-storage';

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

const JournalCard = styled(Card)`
  margin: 0 ${theme.spacing.lg}px ${theme.spacing.lg}px ${theme.spacing.lg}px;
  padding: ${theme.spacing.md}px;
`;

const JournalHeader = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${theme.spacing.md}px;
`;

const JournalDate = styled.Text`
  font-size: ${theme.typography.fontSize.sm}px;
  color: ${theme.colors.text.light};
`;

const JournalMood = styled.View`
  flex-direction: row;
  align-items: center;
`;

const JournalContent = styled.Text`
  font-size: ${theme.typography.fontSize.md}px;
  color: ${theme.colors.text.primary};
  line-height: 22px;
`;

const NewEntryCard = styled(Card)`
  margin: 0 ${theme.spacing.lg}px ${theme.spacing.lg}px ${theme.spacing.lg}px;
  padding: ${theme.spacing.md}px;
`;

const NewEntryHeader = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${theme.spacing.md}px;
`;

const MoodSelector = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: ${theme.spacing.md}px;
`;

const MoodButton = styled.TouchableOpacity`
  align-items: center;
  opacity: ${props => props.selected ? 1 : 0.5};
`;

const MoodText = styled.Text`
  font-size: ${theme.typography.fontSize.xs}px;
  color: ${theme.colors.text.secondary};
  margin-top: ${theme.spacing.xs}px;
`;

const JournalInput = styled.TextInput`
  background-color: ${theme.colors.background};
  border-radius: ${theme.borderRadius.md}px;
  padding: ${theme.spacing.md}px;
  font-size: ${theme.typography.fontSize.md}px;
  color: ${theme.colors.text.primary};
  min-height: 120px;
  text-align-vertical: top;
`;

const ButtonRow = styled.View`
  flex-direction: row;
  justify-content: flex-end;
  margin-top: ${theme.spacing.md}px;
`;

const SaveButton = styled.TouchableOpacity`
  background-color: ${theme.colors.primary};
  border-radius: ${theme.borderRadius.md}px;
  padding: ${theme.spacing.sm}px ${theme.spacing.lg}px;
`;

const SaveButtonText = styled.Text`
  color: ${theme.colors.white};
  font-weight: ${theme.typography.fontWeight.semiBold};
`;

const EmptyStateContainer = styled.View`
  align-items: center;
  justify-content: center;
  padding: ${theme.spacing.xl}px;
  margin-top: ${theme.spacing.xl}px;
`;

const EmptyStateText = styled.Text`
  font-size: ${theme.typography.fontSize.md}px;
  color: ${theme.colors.text.secondary};
  text-align: center;
  margin-top: ${theme.spacing.md}px;
`;

const moods = [
  { id: 'great', icon: 'happy-outline', label: 'Great' },
  { id: 'good', icon: 'smile-outline', label: 'Good' },
  { id: 'okay', icon: 'sad-outline', label: 'Okay' },
  { id: 'bad', icon: 'rainy-outline', label: 'Bad' },
  { id: 'awful', icon: 'thunderstorm-outline', label: 'Awful' }
];

const getMoodIcon = (moodId) => {
  const mood = moods.find(m => m.id === moodId);
  return mood ? mood.icon : 'help-circle-outline';
};

const getMoodColor = (moodId) => {
  switch(moodId) {
    case 'great': return '#4CAF50';
    case 'good': return '#8BC34A';
    case 'okay': return '#FFC107';
    case 'bad': return '#FF9800';
    case 'awful': return '#F44336';
    default: return theme.colors.text.secondary;
  }
};

const formatDate = (date) => {
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(date).toLocaleDateString(undefined, options);
};

const formatTime = (date) => {
  return new Date(date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};

export default function JournalScreen() {
  const [activeTab, setActiveTab] = useState('entries');
  const [searchQuery, setSearchQuery] = useState('');
  const [journalEntries, setJournalEntries] = useState([]);
  const [newEntry, setNewEntry] = useState('');
  const [selectedMood, setSelectedMood] = useState('good');
  const [filteredEntries, setFilteredEntries] = useState([]);

  // Load journal entries from storage
  useEffect(() => {
    const loadEntries = async () => {
      try {
        const entriesJson = await AsyncStorage.getItem('journalEntries');
        if (entriesJson) {
          const entries = JSON.parse(entriesJson);
          setJournalEntries(entries);
          setFilteredEntries(entries);
        }
      } catch (error) {
        console.error('Failed to load journal entries:', error);
      }
    };
    
    loadEntries();
  }, []);

  // Filter entries when search query changes
  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredEntries(journalEntries);
    } else {
      const filtered = journalEntries.filter(entry => 
        entry.content.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredEntries(filtered);
    }
  }, [searchQuery, journalEntries]);

  const saveJournalEntry = async () => {
    if (newEntry.trim() === '') {
      Alert.alert('Empty Entry', 'Please write something in your journal entry.');
      return;
    }

    const newJournalEntry = {
      id: Date.now().toString(),
      date: new Date().toISOString(),
      mood: selectedMood,
      content: newEntry
    };

    const updatedEntries = [newJournalEntry, ...journalEntries];
    
    try {
      await AsyncStorage.setItem('journalEntries', JSON.stringify(updatedEntries));
      setJournalEntries(updatedEntries);
      setFilteredEntries(updatedEntries);
      setNewEntry('');
      setSelectedMood('good');
      setActiveTab('entries');
    } catch (error) {
      console.error('Failed to save journal entry:', error);
      Alert.alert('Error', 'Failed to save your journal entry. Please try again.');
    }
  };

  const deleteEntry = async (id) => {
    Alert.alert(
      'Delete Entry',
      'Are you sure you want to delete this journal entry? This action cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Delete', 
          style: 'destructive',
          onPress: async () => {
            const updatedEntries = journalEntries.filter(entry => entry.id !== id);
            try {
              await AsyncStorage.setItem('journalEntries', JSON.stringify(updatedEntries));
              setJournalEntries(updatedEntries);
              setFilteredEntries(updatedEntries);
            } catch (error) {
              console.error('Failed to delete journal entry:', error);
              Alert.alert('Error', 'Failed to delete the journal entry. Please try again.');
            }
          }
        }
      ]
    );
  };

  return (
    <Container>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Header 
          title="Journal"
          subtitle="Record your thoughts and feelings"
          rightIcon="calendar-outline"
          onRightPress={() => {}}
        />

        <SearchContainer>
          <SearchBar>
            <Ionicons name="search-outline" size={20} color={theme.colors.text.light} />
            <SearchInput 
              placeholder="Search journal entries" 
              value={searchQuery}
              onChangeText={setSearchQuery}
              placeholderTextColor={theme.colors.text.light}
            />
          </SearchBar>
        </SearchContainer>

        <TabContainer>
          <Tab active={activeTab === 'entries'} onPress={() => setActiveTab('entries')}>
            <TabText active={activeTab === 'entries'}>Entries</TabText>
          </Tab>
          <Tab active={activeTab === 'new'} onPress={() => setActiveTab('new')}>
            <TabText active={activeTab === 'new'}>New Entry</TabText>
          </Tab>
          <Tab active={activeTab === 'insights'} onPress={() => setActiveTab('insights')}>
            <TabText active={activeTab === 'insights'}>Insights</TabText>
          </Tab>
        </TabContainer>

        {activeTab === 'entries' && (
          <>
            {filteredEntries.length > 0 ? (
              filteredEntries.map(entry => (
                <JournalCard key={entry.id}>
                  <JournalHeader>
                    <JournalDate>{formatDate(entry.date)} • {formatTime(entry.date)}</JournalDate>
                    <JournalMood>
                      <Ionicons 
                        name={getMoodIcon(entry.mood)} 
                        size={20} 
                        color={getMoodColor(entry.mood)} 
                      />
                      <TouchableOpacity onPress={() => deleteEntry(entry.id)} style={{ marginLeft: 10 }}>
                        <Ionicons name="trash-outline" size={18} color={theme.colors.text.light} />
                      </TouchableOpacity>
                    </JournalMood>
                  </JournalHeader>
                  <JournalContent>{entry.content}</JournalContent>
                </JournalCard>
              ))
            ) : (
              <EmptyStateContainer>
                <Ionicons name="book-outline" size={60} color={theme.colors.tertiary} />
                <EmptyStateText>
                  No journal entries yet.{'\n'}
                  Tap on "New Entry" to start journaling.
                </EmptyStateText>
              </EmptyStateContainer>
            )}
          </>
        )}

        {activeTab === 'new' && (
          <NewEntryCard>
            <NewEntryHeader>
              <JournalDate>{formatDate(new Date())}</JournalDate>
            </NewEntryHeader>
            
            <SectionTitle style={{ margin: 0, marginBottom: 10 }}>How are you feeling?</SectionTitle>
            <MoodSelector>
              {moods.map(mood => (
                <MoodButton 
                  key={mood.id} 
                  selected={selectedMood === mood.id}
                  onPress={() => setSelectedMood(mood.id)}
                >
                  <Ionicons 
                    name={mood.icon} 
                    size={30} 
                    color={selectedMood === mood.id ? getMoodColor(mood.id) : theme.colors.text.secondary} 
                  />
                  <MoodText>{mood.label}</MoodText>
                </MoodButton>
              ))}
            </MoodSelector>
            
            <JournalInput
              placeholder="Write your thoughts here..."
              multiline
              value={newEntry}
              onChangeText={setNewEntry}
              placeholderTextColor={theme.colors.text.light}
            />
            
            <ButtonRow>
              <SaveButton onPress={saveJournalEntry}>
                <SaveButtonText>Save Entry</SaveButtonText>
              </SaveButton>
            </ButtonRow>
          </NewEntryCard>
        )}

        {activeTab === 'insights' && (
          <EmptyStateContainer>
            <Ionicons name="analytics-outline" size={60} color={theme.colors.tertiary} />
            <EmptyStateText>
              Journal insights coming soon!{'\n'}
              Track patterns in your mood and thoughts over time.
            </EmptyStateText>
          </EmptyStateContainer>
        )}
      </ScrollView>
    </Container>
  );
}
