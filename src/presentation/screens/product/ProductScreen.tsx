import { FlatList, ScrollView, Text } from 'react-native';
import MainLayout from '../../layouts/MainLayout';
import { useLocalSearchParams } from 'expo-router';
import { useQuery } from '@tanstack/react-query';
import { getProductById } from '@/src/actions/products/get-products-by-id';
import { useRef } from 'react';
import {
  Button,
  ButtonGroup,
  Input,
  Layout,
  useTheme,
} from '@ui-kitten/components';
import { FadeInImage } from '../../components/ui/FadeInImage';
import { Size, Gender } from '@/src/domain/entities/product';
import CustomIcon from '../../components/ui/CustomIcon';

const sizes: Size[] = [Size.Xs, Size.S, Size.M, Size.L, Size.Xl, Size.Xxl];
const genders: Gender[] = [Gender.Kid, Gender.Men, Gender.Unisex, Gender.Women];

const ProductScreen = () => {
  const { Product: productId } = useLocalSearchParams();
  const theme = useTheme();
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
      <ScrollView style={{ flex: 1 }}>
        {/* Product images */}
        <Layout>
          <FlatList
            data={product?.images}
            horizontal
            keyExtractor={(item) => item}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => (
              <FadeInImage
                uri={item}
                style={{ width: 300, height: 300, marginHorizontal: 7 }}
              />
            )}
          />
        </Layout>
        {/* Form */}
        <Layout style={{ marginHorizontal: 10 }}>
          <Input
            label={'Title'}
            value={product.title}
            style={{ marginVertical: 5 }}
          />
          <Input
            label={'Slug'}
            value={product.slug}
            style={{ marginVertical: 5 }}
          />
          <Input
            label={'Description'}
            value={product.description}
            style={{ marginVertical: 5 }}
            multiline
            numberOfLines={5}
          />
        </Layout>

        <Layout
          style={{
            marginHorizontal: 15,
            flexDirection: 'row',
            gap: 10,
            marginVertical: 5,
          }}
        >
          {/* Price and stock */}
          <Input
            label={'Price'}
            value={product.price.toString()}
            style={{ flex: 1 }}
          />
          <Input
            label={'Stock'}
            value={product.stock.toString()}
            style={{ flex: 1 }}
          />
        </Layout>

        {/* Selectors */}
        <ButtonGroup
          size='small'
          style={{ margin: 2, marginTop: 20, marginHorizontal: 15 }}
          appearance='outline'
        >
          {sizes.map((size) => (
            <Button
              style={{
                flex: 1,
                backgroundColor: true ? theme['color-primary-200'] : undefined,
              }}
              key={size}
              status='basic'
            >
              {size}
            </Button>
          ))}
        </ButtonGroup>

        <ButtonGroup
          size='small'
          style={{ margin: 2, marginTop: 20, marginHorizontal: 15 }}
          appearance='outline'
        >
          {genders.map((gender) => (
            <Button
              style={{
                flex: 1,
                backgroundColor: true ? theme['color-primary-200'] : undefined,
              }}
              key={gender}
              status='basic'
            >
              {gender}
            </Button>
          ))}
        </ButtonGroup>

        {/* Save  */}
        <Button
          style={{ margin: 15 }}
          accessoryLeft={<CustomIcon name='save-outline' white />}
          onPress={() => console.log('Save')}
        >
          Save
        </Button>

        <Text>{JSON.stringify(product, null, 2)}</Text>

        <Layout style={{ height: 200 }} />
      </ScrollView>
    </MainLayout>
  );
};
export default ProductScreen;
