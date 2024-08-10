import { FlatList, Image, ScrollView, Text } from 'react-native';
import MainLayout from '../../layouts/MainLayout';
import { useLocalSearchParams } from 'expo-router';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
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
import { Size, Gender, Product } from '@/src/domain/entities/product';
import CustomIcon from '../../components/ui/CustomIcon';
import { Formik } from 'formik';
import { updateCreateProduct } from '@/src/actions/products/update-create-product';

const sizes: Size[] = [Size.Xs, Size.S, Size.M, Size.L, Size.Xl, Size.Xxl];
const genders: Gender[] = [Gender.Kid, Gender.Men, Gender.Unisex, Gender.Women];

const ProductScreen = () => {
  const { Product: productId } = useLocalSearchParams();
  const theme = useTheme();
  const productIdRef = useRef<string>(productId as string);
  const queryClient = useQueryClient();

  const { data: product, isLoading } = useQuery({
    queryKey: ['product', productIdRef.current],
    queryFn: () => getProductById(productIdRef.current as string),
  });

  const mutation = useMutation({
    mutationFn: (data: Product) =>
      updateCreateProduct({ ...data, id: productIdRef.current }),
    onSuccess(data) {
      productIdRef.current = data.id; //creation
      queryClient.invalidateQueries({
        queryKey: ['products', 'infinite'],
      });
      queryClient.invalidateQueries({
        queryKey: ['product', data.id],
      });
    },
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
    <Formik
      initialValues={product}
      onSubmit={(values) => mutation.mutate(values)}
    >
      {({ handleChange, handleSubmit, values, errors, setFieldValue }) => (
        <MainLayout title={values.title} subTitle={`$ ${values.price}`}>
          <ScrollView style={{ flex: 1 }} automaticallyAdjustKeyboardInsets>
            {/* Product images */}
            <Layout
              style={{
                marginVertical: 10,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              {values.images.length === 0 ? (
                <Image
                  source={require('@/src/assets/no-product-image.png')}
                  style={{ width: 300, height: 300 }}
                />
              ) : (
                <FlatList
                  data={values.images}
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
              )}
            </Layout>
            {/* Form */}
            <Layout style={{ marginHorizontal: 10 }}>
              <Input
                label={'Title'}
                style={{ marginVertical: 5 }}
                value={values.title}
                onChangeText={handleChange('title')}
              />
              <Input
                label={'Slug'}
                style={{ marginVertical: 5 }}
                value={values.slug}
                onChangeText={handleChange('slug')}
              />
              <Input
                label={'Description'}
                style={{ marginVertical: 5 }}
                multiline
                numberOfLines={5}
                value={values.description}
                onChangeText={handleChange('description')}
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
                style={{ flex: 1 }}
                value={values.price.toString()}
                onChangeText={handleChange('price')}
                keyboardType='numeric'
              />
              <Input
                label={'Stock'}
                style={{ flex: 1 }}
                value={values.stock.toString()}
                onChangeText={handleChange('stock')}
                keyboardType='number-pad'
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
                  onPress={() =>
                    setFieldValue(
                      'sizes',
                      values.sizes.includes(size)
                        ? values.sizes.filter((s) => s !== size)
                        : [...values.sizes, size]
                    )
                  }
                  style={{
                    flex: 1,
                    backgroundColor: values.sizes.includes(size)
                      ? theme['color-primary-200']
                      : undefined,
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
                  onPress={() => setFieldValue('gender', gender)}
                  style={{
                    flex: 1,
                    backgroundColor: values.gender.startsWith(gender)
                      ? theme['color-primary-200']
                      : undefined,
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
              onPress={() => handleSubmit()}
              disabled={mutation.isPending}
            >
              Save
            </Button>

            <Text>{JSON.stringify(values, null, 2)}</Text>

            <Layout style={{ height: 200 }} />
          </ScrollView>
        </MainLayout>
      )}
    </Formik>
  );
};
export default ProductScreen;
