import React from 'react';
import { ScrollView, Linking, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styled from 'styled-components/native';
import { theme } from '../theme/theme';
import Header from '../components/Header';
import Card from '../components/Card';
import Button from '../components/Button';

const Container = styled.SafeAreaView`
  flex: 1;
  background-color: ${theme.colors.background};
`;

const Content = styled.View`
  padding: ${theme.spacing.lg}px;
`;

const Title = styled.Text`
  font-size: ${theme.typography.fontSize.xl}px;
  font-weight: ${theme.typography.fontWeight.bold};
  color: ${theme.colors.text.primary};
  margin-bottom: ${theme.spacing.md}px;
`;

const Description = styled.Text`
  font-size: ${theme.typography.fontSize.md}px;
  color: ${theme.colors.text.secondary};
  margin-bottom: ${theme.spacing.xl}px;
  line-height: 22px;
`;

const EmergencyCard = styled(Card)`
  padding: ${theme.spacing.lg}px;
  background-color: ${theme.colors.error + '15'};
  margin-bottom: ${theme.spacing.lg}px;
  border-left-width: 4px;
  border-left-color: ${theme.colors.error};
`;

const EmergencyTitle = styled.Text`
  font-size: ${theme.typography.fontSize.lg}px;
  font-weight: ${theme.typography.fontWeight.bold};
  color: ${theme.colors.error};
  margin-bottom: ${theme.spacing.sm}px;
`;

const EmergencyDescription = styled.Text`
  font-size: ${theme.typography.fontSize.md}px;
  color: ${theme.colors.text.primary};
  margin-bottom: ${theme.spacing.md}px;
  line-height: 22px;
`;

const ButtonContainer = styled.View`
  margin-bottom: ${theme.spacing.lg}px;
`;

const ResourcesTitle = styled.Text`
  font-size: ${theme.typography.fontSize.lg}px;
  font-weight: ${theme.typography.fontWeight.semiBold};
  color: ${theme.colors.text.primary};
  margin: ${theme.spacing.lg}px 0 ${theme.spacing.md}px 0;
`;

const ResourceCard = styled(Card)`
  padding: ${theme.spacing.md}px;
  margin-bottom: ${theme.spacing.md}px;
  flex-direction: row;
  align-items: center;
`;

const ResourceIcon = styled.View`
  width: 50px;
  height: 50px;
  border-radius: 25px;
  background-color: ${props => props.color || theme.colors.card.meditation + '40'};
  align-items: center;
  justify-content: center;
  margin-right: ${theme.spacing.md}px;
`;

const ResourceContent = styled.View`
  flex: 1;
`;

const ResourceTitle = styled.Text`
  font-size: ${theme.typography.fontSize.md}px;
  font-weight: ${theme.typography.fontWeight.semiBold};
  color: ${theme.colors.text.primary};
  margin-bottom: ${theme.spacing.xs}px;
`;

const ResourceDescription = styled.Text`
  font-size: ${theme.typography.fontSize.sm}px;
  color: ${theme.colors.text.secondary};
`;

const ExerciseSection = styled.View`
  margin-top: ${theme.spacing.xl}px;
`;

const ExerciseCard = styled(Card)`
  padding: ${theme.spacing.lg}px;
  margin-bottom: ${theme.spacing.md}px;
  background-color: ${theme.colors.card.breathing + '30'};
`;

const ExerciseTitle = styled.Text`
  font-size: ${theme.typography.fontSize.md}px;
  font-weight: ${theme.typography.fontWeight.semiBold};
  color: ${theme.colors.text.primary};
  margin-bottom: ${theme.spacing.sm}px;
`;

const ExerciseStep = styled.View`
  flex-direction: row;
  align-items: flex-start;
  margin-bottom: ${theme.spacing.sm}px;
`;

const StepNumber = styled.View`
  width: 24px;
  height: 24px;
  border-radius: 12px;
  background-color: ${theme.colors.secondary};
  align-items: center;
  justify-content: center;
  margin-right: ${theme.spacing.sm}px;
`;

const StepNumberText = styled.Text`
  color: white;
  font-weight: ${theme.typography.fontWeight.bold};
  font-size: ${theme.typography.fontSize.sm}px;
`;

const StepText = styled.Text`
  flex: 1;
  font-size: ${theme.typography.fontSize.md}px;
  color: ${theme.colors.text.primary};
  line-height: 22px;
`;

const resources = [
  {
    id: 1,
    title: 'National Suicide Prevention Lifeline',
    description: '24/7, free and confidential support',
    icon: 'call-outline',
    color: theme.colors.card.meditation + '40',
    action: 'tel:1-800-273-8255',
  },
  {
    id: 2,
    title: 'Crisis Text Line',
    description: 'Text HOME to 741741',
    icon: 'chatbubble-outline',
    color: theme.colors.card.breathing + '40',
    action: 'sms:741741?body=HOME',
  },
  {
    id: 3,
    title: 'Find Local Mental Health Services',
    description: 'Search for providers in your area',
    icon: 'location-outline',
    color: theme.colors.card.community + '40',
    action: 'https://findtreatment.samhsa.gov/',
  },
];

export default function SOSScreen({ navigation }) {
  const handleResourcePress = (action) => {
    if (action.startsWith('tel:')) {
      Linking.openURL(action).catch(err => {
        Alert.alert('Error', 'Could not open phone app');
      });
    } else if (action.startsWith('sms:')) {
      Linking.openURL(action).catch(err => {
        Alert.alert('Error', 'Could not open messaging app');
      });
    } else if (action.startsWith('http')) {
      Linking.openURL(action).catch(err => {
        Alert.alert('Error', 'Could not open browser');
      });
    }
  };

  return (
    <Container>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Header 
          title="SOS Help"
          leftIcon="arrow-back"
          onLeftPress={() => navigation.goBack()}
        />

        <Content>
          <EmergencyCard>
            <EmergencyTitle>In case of emergency</EmergencyTitle>
            <EmergencyDescription>
              If you or someone you know is in immediate danger, please call emergency services right away.
            </EmergencyDescription>
            <Button 
              title="Call Emergency Services (911)"
              variant="error"
              icon={<Ionicons name="call" size={20} color="white" style={{ marginRight: 8 }} />}
              iconPosition="left"
              onPress={() => {
                Alert.alert(
                  'Call Emergency Services',
                  'Are you sure you want to call 911?',
                  [
                    { text: 'Cancel', style: 'cancel' },
                    { text: 'Call', onPress: () => Linking.openURL('tel:911') }
                  ]
                );
              }}
            />
          </EmergencyCard>

          <Title>Need to talk to someone?</Title>
          <Description>
            If you're feeling overwhelmed, anxious, or in crisis, help is available. These resources provide immediate support from trained professionals.
          </Description>

          {resources.map(resource => (
            <ResourceCard key={resource.id} onPress={() => handleResourcePress(resource.action)}>
              <ResourceIcon color={resource.color}>
                <Ionicons name={resource.icon} size={24} color={theme.colors.primary} />
              </ResourceIcon>
              <ResourceContent>
                <ResourceTitle>{resource.title}</ResourceTitle>
                <ResourceDescription>{resource.description}</ResourceDescription>
              </ResourceContent>
              <Ionicons name="chevron-forward" size={20} color={theme.colors.text.light} />
            </ResourceCard>
          ))}

          <ExerciseSection>
            <ResourcesTitle>Grounding Exercises</ResourcesTitle>
            <ExerciseCard>
              <ExerciseTitle>5-4-3-2-1 Technique</ExerciseTitle>
              
              <ExerciseStep>
                <StepNumber>
                  <StepNumberText>5</StepNumberText>
                </StepNumber>
                <StepText>Acknowledge FIVE things you see around you</StepText>
              </ExerciseStep>
              
              <ExerciseStep>
                <StepNumber>
                  <StepNumberText>4</StepNumberText>
                </StepNumber>
                <StepText>Acknowledge FOUR things you can touch around you</StepText>
              </ExerciseStep>
              
              <ExerciseStep>
                <StepNumber>
                  <StepNumberText>3</StepNumberText>
                </StepNumber>
                <StepText>Acknowledge THREE things you hear</StepText>
              </ExerciseStep>
              
              <ExerciseStep>
                <StepNumber>
                  <StepNumberText>2</StepNumberText>
                </StepNumber>
                <StepText>Acknowledge TWO things you can smell</StepText>
              </ExerciseStep>
              
              <ExerciseStep>
                <StepNumber>
                  <StepNumberText>1</StepNumberText>
                </StepNumber>
                <StepText>Acknowledge ONE thing you can taste</StepText>
              </ExerciseStep>
            </ExerciseCard>

            <ButtonContainer>
              <Button 
                title="Start Guided Breathing"
                variant="secondary"
                onPress={() => navigation.navigate('Breathing')}
              />
            </ButtonContainer>
          </ExerciseSection>
        </Content>
      </ScrollView>
    </Container>
  );
}
