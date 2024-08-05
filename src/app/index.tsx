import { Button, Text, Layout } from '@ui-kitten/components';
import { Link } from 'expo-router';

export default function Index() {
  return (
    <Layout
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Text category='h3'>Edit app/index.tsx to edit this screen.</Text>
      <Link asChild href={'/Login'}>
        <Button>Click me</Button>
      </Link>
    </Layout>
  );
}
