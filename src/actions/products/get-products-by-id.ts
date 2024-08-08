import { tesloApi } from '@/src/config/api/tesloApi';
import { Product } from '@/src/domain/entities/product';
import { ProductMapper } from '@/src/infrastructure/interfaces/mappers/product.mapper';
import { TesloProduct } from '@/src/infrastructure/interfaces/teslo-products.response';

export const getProductById = async (id: string): Promise<Product> => {
  try {
    const { data } = await tesloApi.get<TesloProduct>(`/products/${id}`);
    return ProductMapper.testloProductToEntity(data);
  } catch (error) {
    console.log(error);
    throw new Error('Error getting product by id');
  }
};
