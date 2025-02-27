
import { useColorScheme } from './useColorScheme';
import { Colors } from '../constants/Colors';

export function useThemeColor(
  props,
  colorName
) {
  const theme = useColorScheme();
  const colorFromProps = props[theme];

  if (colorFromProps) {
    return colorFromProps;
  } else {
    return Colors[theme][colorName];
  }
}
