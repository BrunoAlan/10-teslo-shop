import { tesloApi } from '@/src/config/api/tesloApi';
import { Product } from '@/src/domain/entities/product';
import { isAxiosError } from 'axios';

export const updateCreateProduct = (product: Partial<Product>) => {
  product.stock = Number(product.stock);
  product.price = Number(product.price);

  if (product.id) {
    return updateProduct(product);
  }
  throw new Error('Not implemented');
};

//TODO review if the user is coming
const updateProduct = async (product: Partial<Product>) => {
  console.log(product);
  const { id, images = [], ...rest } = product;

  try {
    const checkedImages = prepareImages(images);
    console.log(checkedImages);
    const { data } = await tesloApi.patch(`/products/${id}`, {
      images: checkedImages,
      ...rest,
    });
    return data;
  } catch (error) {
    if (isAxiosError(error)) {
      console.log(error.response?.data);
    }
    throw new Error('Error updating product');
  }
};

const prepareImages = (images: string[]) => {
  //TODO: review files
  return images.map((image) => image.split('/').pop());
};
