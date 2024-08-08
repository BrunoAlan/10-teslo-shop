import { Product } from '@/src/domain/entities/product';
import { Card, Text } from '@ui-kitten/components';
import { Image } from 'react-native';
import { FadeInImage } from '../ui/FadeInImage';
import { Link } from 'expo-router';

interface Props {
  product: Product;
}

export const ProductCard = ({ product }: Props) => {
  return (
    <Link asChild href={`/${product.id}`}>
      <Card style={{ flex: 1, backgroundColor: '#F9F9F9', margin: 3 }}>
        {product.images.length === 0 ? (
          <Image
            source={require('@/src/assets/no-product-image.png')}
            style={{ width: '100%', height: 200 }}
          />
        ) : (
          <FadeInImage
            uri={product.images[0]}
            style={{ flex: 1, width: '100%', height: 200 }}
          />
        )}
        <Text numberOfLines={2} style={{ textAlign: 'center' }}>
          {product.title}
        </Text>
      </Card>
    </Link>
  );
};
