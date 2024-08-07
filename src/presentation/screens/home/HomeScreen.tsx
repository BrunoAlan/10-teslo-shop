import { Button, Layout, Text } from '@ui-kitten/components';
import { useAuthStore } from '../../store/auth/useAuthStore';
import { useQuery } from '@tanstack/react-query';
import { getProductsByPage } from '@/src/actions/products/get-products-by-page';
import MainLayout from '../../layouts/MainLayout';

const HomeScreen = () => {
  const { logout } = useAuthStore();
  const { isLoading, data: products = [] } = useQuery({
    queryKey: ['products', 'infinite'],
    staleTime: 1000 * 60 * 60, // 1 hour
    queryFn: () => getProductsByPage(0),
  });

  return (
    <MainLayout
      title='TesloShop - Products'
      subTitle='Welcome to the TesloShop'
    >
      <Text>asdas</Text>
    </MainLayout>
  );
};
export default HomeScreen;
