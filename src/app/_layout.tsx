import { Stack } from 'expo-router';
import * as eva from '@eva-design/eva';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import { useColorScheme } from 'react-native';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import * as SystemUI from 'expo-system-ui';
import { AuthProvider } from '../presentation/providers/AuthProvider';

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const theme = colorScheme === 'dark' ? eva.dark : eva.light;
  const background =
    colorScheme === 'dark'
      ? theme['color-basic-800']
      : theme['color-basic-800'];
  SystemUI.setBackgroundColorAsync(background);

  return (
    <>
      <AuthProvider>
        <IconRegistry icons={EvaIconsPack} />
        <ApplicationProvider {...eva} theme={theme}>
          <Stack
            screenOptions={{
              headerShown: false,
            }}
          >
            <Stack.Screen name='index' />
          </Stack>
        </ApplicationProvider>
      </AuthProvider>
    </>
  );
}
