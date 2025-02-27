
import { StyleProp, StyleSheet, Text, ViewStyle } from 'react-native';

export function IconSymbol({ name, size = 24, color = '#000', style }) {
  return (
    <Text style={[styles.symbol, { fontSize: size, color }, style]}>{name}</Text>
  );
}

const styles = StyleSheet.create({
  symbol: {
    fontWeight: 'bold',
  },
});
