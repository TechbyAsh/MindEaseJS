
import { useRef, useMemo } from 'react';
import { Animated, StyleSheet, View } from 'react-native';

import { useColorScheme } from '../hooks/useColorScheme';

export default function ParallaxScrollView({ 
  children, 
  headerBackgroundColor, 
  headerImage,
  headerHeight = 250,
}) {
  const colorScheme = useColorScheme();
  const scrollY = useRef(new Animated.Value(0)).current;
  
  const headerBackgroundColorValue = useMemo(() => {
    return headerBackgroundColor[colorScheme] || (colorScheme === 'dark' ? '#000' : '#fff');
  }, [colorScheme, headerBackgroundColor]);

  const headerTranslate = scrollY.interpolate({
    inputRange: [0, headerHeight],
    outputRange: [0, -headerHeight],
    extrapolate: 'clamp',
  });

  const imageOpacity = scrollY.interpolate({
    inputRange: [0, headerHeight / 2, headerHeight],
    outputRange: [1, 0.5, 0],
    extrapolate: 'clamp',
  });

  const headerStyle = {
    height: headerHeight,
    backgroundColor: headerBackgroundColorValue,
    transform: [{ translateY: headerTranslate }],
  };

  const imageStyle = {
    opacity: imageOpacity,
  };

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.header, headerStyle]}>
        <Animated.View style={[styles.headerImageContainer, imageStyle]}>
          {headerImage}
        </Animated.View>
      </Animated.View>
      <Animated.ScrollView
        style={styles.scrollView}
        contentContainerStyle={[styles.scrollViewContent, { paddingTop: headerHeight }]}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true }
        )}
        scrollEventThrottle={16}>
        {children}
      </Animated.ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollViewContent: {
    paddingBottom: 30,
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    overflow: 'hidden',
    zIndex: 10,
  },
  headerImageContainer: {
    position: 'relative',
    width: '100%',
    height: '100%',
  },
});
