
import { useState } from 'react';
import { StyleSheet, Pressable } from 'react-native';
import Animated, { useAnimatedStyle, withTiming } from 'react-native-reanimated';

import { ThemedText } from './ThemedText';
import { ThemedView } from './ThemedView';
import { IconSymbol } from './ui/IconSymbol';
import { useThemeColor } from '../hooks/useThemeColor';

export function Collapsible({ title, children }) {
  const [isOpen, setIsOpen] = useState(false);
  const borderColor = useThemeColor({}, 'border');
  const tintColor = useThemeColor({}, 'tint');

  const contentStyle = useAnimatedStyle(() => {
    return {
      maxHeight: isOpen ? withTiming(1000) : withTiming(0),
      opacity: isOpen ? withTiming(1) : withTiming(0),
    };
  });

  return (
    <ThemedView lightColor="#f9f9f9" darkColor="#242424" style={styles.container}>
      <Pressable
        style={[styles.header, { borderBottomColor: isOpen ? borderColor : 'transparent' }]}
        onPress={() => setIsOpen(!isOpen)}>
        <ThemedText style={styles.title}>{title}</ThemedText>
        <IconSymbol
          name={isOpen ? 'chevron.up' : 'chevron.down'}
          color={tintColor}
          size={16}
        />
      </Pressable>
      <Animated.View style={[styles.content, contentStyle]}>
        {children}
      </Animated.View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 8,
    overflow: 'hidden',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
  },
  title: {
    fontWeight: '600',
    fontSize: 16,
  },
  content: {
    padding: 16,
    overflow: 'hidden',
  },
});
