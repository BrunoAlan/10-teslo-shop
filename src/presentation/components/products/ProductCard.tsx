import { Product } from '@/src/domain/entities/product';
import { Layout, Text } from '@ui-kitten/components';

interface Props {
  product: Product;
}

export const ProductCard = ({ product }: Props) => {
  return (
    <Layout>
      <Text>{product.title}</Text>
    </Layout>
  );
};
