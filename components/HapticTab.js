
import * as Haptics from 'expo-haptics';
import { Pressable } from 'react-native';

export function HapticTab({ onPress, ...props }) {
  return (
    <Pressable
      {...props}
      onPress={(e) => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        onPress?.(e);
      }}
    />
  );
}
