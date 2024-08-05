import { Button, Input, Layout, Text } from '@ui-kitten/components';
import { ScrollView, useWindowDimensions } from 'react-native';

const LoginScreen = () => {
  const { height } = useWindowDimensions();
  return (
    <Layout style={{ flex: 1 }}>
      <ScrollView style={{ marginHorizontal: 40 }}>
        <Layout style={{ paddingTop: height * 0.35 }}>
          <Text category='h1'>Login</Text>
          <Text category='p2'>Please login to continue</Text>

          <Layout style={{ marginTop: 20 }}>
            <Input
              placeholder='Email'
              style={{ marginBottom: 10 }}
              autoCapitalize='none'
              keyboardType='email-address'
            />
            <Input
              placeholder='Password'
              style={{ marginBottom: 10 }}
              autoCapitalize='none'
              secureTextEntry
            />
            <Layout style={{ height: 20 }} />
            <Layout>
              <Button onPress={() => {}}>Log in</Button>
            </Layout>

            <Layout
              style={{
                marginTop: 50,
                alignItems: 'flex-end',
                justifyContent: 'center',
                flexDirection: 'row',
              }}
            >
              <Text>Don't have an account?</Text>
              <Text status='primary' category='s1' onPress={() => {}}>
                {' '}
                Sign up{' '}
              </Text>
            </Layout>
          </Layout>
        </Layout>
      </ScrollView>
    </Layout>
  );
};
export default LoginScreen;
