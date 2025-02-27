
import { Pressable } from 'react-native';
import * as WebBrowser from 'expo-web-browser';

export function ExternalLink(props) {
  const { href, children, ...otherProps } = props;
  
  return (
    <Pressable
      onPress={() => WebBrowser.openBrowserAsync(href)}
      {...otherProps}>
      {children}
    </Pressable>
  );
}
