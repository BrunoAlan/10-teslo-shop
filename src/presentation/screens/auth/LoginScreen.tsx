import { Button, Input, Layout, Text } from '@ui-kitten/components';
import { Alert, ScrollView, useWindowDimensions } from 'react-native';
import CustomIcon from '../../components/ui/CustomIcon';
import { Stack, useRouter } from 'expo-router';
import { useState } from 'react';
import { useAuthStore } from '../../store/auth/useAuthStore';

const LoginScreen = () => {
  const { height } = useWindowDimensions();
  const router = useRouter();
  const { login } = useAuthStore();
  const [isPosting, setIsPosting] = useState(false);
  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const onLogin = async () => {
    if (!form.email || !form.password) {
      return;
    }
    setIsPosting(true);
    const wasSuccessful = await login(form.email, form.password);
    setIsPosting(false);
    if (wasSuccessful) return;
    Alert.alert('Invalid credentials');
  };

  return (
    <Layout style={{ flex: 1 }}>
      <Stack.Screen options={{ animation: 'fade' }} />
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
              value={form.email}
              onChangeText={(email) => setForm({ ...form, email })}
              accessoryLeft={<CustomIcon name='email-outline' />}
            />
            <Input
              placeholder='Password'
              style={{ marginBottom: 10 }}
              autoCapitalize='none'
              secureTextEntry
              value={form.password}
              onChangeText={(password) => setForm({ ...form, password })}
              accessoryLeft={<CustomIcon name='lock-outline' />}
            />
            <Layout style={{ height: 20 }} />
            <Layout>
              <Button
                disabled={isPosting}
                accessoryRight={
                  <CustomIcon white name='arrow-forward-outline' />
                }
                onPress={onLogin}
              >
                Log in
              </Button>
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
              <Text
                status='primary'
                category='s1'
                onPress={() => router.navigate('/Register')}
              >
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
