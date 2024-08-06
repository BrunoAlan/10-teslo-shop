import { Button, Input, Layout, Text } from '@ui-kitten/components';
import { ScrollView, useWindowDimensions } from 'react-native';
import CustomIcon from '../../components/ui/CustomIcon';
import { useRouter, Stack } from 'expo-router';

const RegisterScreen = () => {
  const { height } = useWindowDimensions();
  const router = useRouter();
  return (
    <Layout style={{ flex: 1 }}>
      <Stack.Screen options={{ animation: 'fade' }} />
      <ScrollView style={{ marginHorizontal: 40 }}>
        <Layout style={{ paddingTop: height * 0.3 }}>
          <Text category='h1'>Sign up</Text>
          <Text category='p2'>Please create an account to continue</Text>

          <Layout style={{ marginTop: 20 }}>
            <Input
              placeholder='Full Name'
              style={{ marginBottom: 10 }}
              autoCapitalize='none'
              keyboardType='email-address'
              accessoryLeft={<CustomIcon name='person-outline' />}
            />
            <Input
              placeholder='Email'
              style={{ marginBottom: 10 }}
              autoCapitalize='none'
              keyboardType='email-address'
              accessoryLeft={<CustomIcon name='email-outline' />}
            />
            <Input
              placeholder='Password'
              style={{ marginBottom: 10 }}
              autoCapitalize='none'
              secureTextEntry
              accessoryLeft={<CustomIcon name='lock-outline' />}
            />
            <Layout style={{ height: 20 }} />
            <Layout>
              <Button
                accessoryRight={
                  <CustomIcon white name='arrow-forward-outline' />
                }
                onPress={() => {}}
              >
                Create
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
              <Text>Already have an account? </Text>
              <Text
                status='primary'
                category='s1'
                onPress={() => router.back()}
              >
                Log in
              </Text>
            </Layout>
          </Layout>
        </Layout>
      </ScrollView>
    </Layout>
  );
};
export default RegisterScreen;
