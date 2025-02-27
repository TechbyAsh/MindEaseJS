
import { Platform } from 'react-native';
import { BlurView } from 'expo-blur';
import { useColorScheme } from '../../hooks/useColorScheme';

export default function TabBarBackground() {
  const colorScheme = useColorScheme();
  
  if (Platform.OS === 'ios') {
    return (
      <BlurView
        intensity={colorScheme === 'dark' ? 100 : 80}
        tint={colorScheme}
        style={{ position: 'absolute', width: '100%', height: '100%' }}
      />
    );
  }
  
  return null;
}
