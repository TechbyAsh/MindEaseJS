
import { useEffect, useState } from 'react';
import { StyleSheet, Text } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';

export function HelloWave() {
  const [loaded, setLoaded] = useState(false);
  const rotation = useSharedValue(0);

  useEffect(() => {
    setLoaded(true);
    // Start the animation
    rotation.value = withRepeat(
      withTiming(1, { duration: 1000 }),
      -1,
      true
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          rotate: `${rotation.value * 20}deg`,
        },
      ],
    };
  });

  return (
    <Animated.View style={[styles.container, animatedStyle]}>
      <Text style={styles.wave}>👋</Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginLeft: 10,
  },
  wave: {
    fontSize: 24,
  },
});
