import { Text } from 'react-native';
import MainLayout from '../../layouts/MainLayout';
import { useLocalSearchParams } from 'expo-router';
import { useQuery } from '@tanstack/react-query';
import { getProductById } from '@/src/actions/products/get-products-by-id';
import { useRef } from 'react';
const ProductScreen = () => {
  const { Product: productId } = useLocalSearchParams();
  const productIdRef = useRef(productId);

  const { data: product, isLoading } = useQuery({
    queryKey: ['product', productIdRef.current],
    queryFn: () => getProductById(productId as string),
  });

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  if (!product) {
    return (
      <MainLayout title='Product not found' subTitle='Product not found'>
        <Text>Product not found</Text>
      </MainLayout>
    );
  }

  return (
    <MainLayout title={product?.title} subTitle={`$ ${product?.price}`}>
      <Text>{product?.title} </Text>
    </MainLayout>
  );
};
export default ProductScreen;
