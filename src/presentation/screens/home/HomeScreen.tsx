import { Layout } from '@ui-kitten/components';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { getProductsByPage } from '@/src/actions/products/get-products-by-page';
import MainLayout from '../../layouts/MainLayout';
import FullScreenLoader from '../../components/ui/FullScreenLoader';
import ProductsList from '../../components/products/ProductsList';

const HomeScreen = () => {
  // const { isLoading, data: products = [] } = useQuery({
  //   queryKey: ['products', 'infinite'],
  //   staleTime: 1000 * 60 * 60, // 1 hour
  //   queryFn: () => getProductsByPage(0),
  // });

  const { isLoading, data, fetchNextPage } = useInfiniteQuery({
    queryKey: ['products', 'infinite'],
    staleTime: 1000 * 60 * 60, // 1 hour
    initialPageParam: 0,
    queryFn: async (params) => {
      const products = await getProductsByPage(params.pageParam);
      return products;
    },
    getNextPageParam: (lastPage, allPages) => allPages.length,
  });

  return (
    <MainLayout
      title='TesloShop - Products'
      subTitle='Welcome to the TesloShop'
    >
      {isLoading ? (
        <FullScreenLoader />
      ) : (
        <Layout>
          <ProductsList
            products={data?.pages.flat() ?? []}
            fetchNextPage={fetchNextPage}
          />
        </Layout>
      )}
    </MainLayout>
  );
};
export default HomeScreen;
