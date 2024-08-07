import { Button, Layout, Text } from '@ui-kitten/components';
import CustomIcon from '../../components/ui/CustomIcon';
import { useAuthStore } from '../../store/auth/useAuthStore';

const HomeScreen = () => {
  const { logout } = useAuthStore();
  return (
    <Layout style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text category='h1'>Home</Text>
      <Button
        accessoryLeft={<CustomIcon name='log-out-outline' white />}
        onPress={logout}
      >
        Logout
      </Button>
    </Layout>
  );
};
export default HomeScreen;
