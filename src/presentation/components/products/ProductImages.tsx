import { Image, FlatList } from 'react-native';
import { FadeInImage } from '../ui/FadeInImage';
interface Props {
  images: string[];
}
const ProductImages = ({ images }: Props) => {
  return (
    <>
      {images.length === 0 ? (
        <Image
          source={require('@/src/assets/no-product-image.png')}
          style={{ width: 300, height: 300 }}
        />
      ) : (
        <FlatList
          data={images}
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
    </>
  );
};
export default ProductImages;
