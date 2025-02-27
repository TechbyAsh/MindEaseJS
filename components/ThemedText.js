
import { Text } from 'react-native';

import { useThemeColor } from '../hooks/useThemeColor';

export function ThemedText(props) {
  const { style, lightColor, darkColor, type, ...otherProps } = props;
  const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text');

  let textStyle = {};
  switch (type) {
    case 'title':
      textStyle = {
        fontSize: 28,
        fontWeight: 'bold',
      };
      break;
    case 'subtitle':
      textStyle = {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 8,
      };
      break;
    case 'defaultSemiBold':
      textStyle = {
        fontWeight: '600',
      };
      break;
    case 'link':
      textStyle = {
        fontWeight: '600',
        color: useThemeColor({}, 'tint'),
      };
      break;
    default:
      textStyle = {
        fontSize: 16,
        lineHeight: 24,
        marginVertical: 4,
      };
      break;
  }

  return <Text style={[{ color }, textStyle, style]} {...otherProps} />;
}
