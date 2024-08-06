import { Icon, useTheme } from '@ui-kitten/components';
import { StyleSheet } from 'react-native';

interface Props {
  name: string;
  color?: string;
  white?: boolean;
}

function CustomIcon({ name, color, white = false }: Props) {
  const theme = useTheme();
  if (white) {
    color = theme['color-info-100'];
  } else if (!color) {
    color = theme['text-basic-color'];
  } else {
    color = theme[color] ?? theme['text-basic-color'];
  }
  console.log(theme);

  return <Icon name={name} fill={color} style={styles.icon} />;
}
const styles = StyleSheet.create({
  icon: {
    width: 32,
    height: 32,
  },
});

export default CustomIcon;
