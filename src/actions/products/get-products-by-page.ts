import { tesloApi } from '@/src/config/api/tesloApi';
import type { Product } from '@/src/domain/entities/product';
import type { TesloProduct } from '@/src/infrastructure/interfaces/teslo-products.response';
import { ProductMapper } from '@/src/infrastructure/interfaces/mappers/product.mapper';

export const getProductsByPage = async (
  page: number,
  limit: number = 20
): Promise<Product[]> => {
  console.log({ page, limit });
  try {
    const { data } = await tesloApi.get<TesloProduct[]>(
      `/products?offset=${page * 10}&limit=${limit}`
    );
    const products = data.map(ProductMapper.testloProductToEntity);
    return products;
  } catch (error) {
    console.error(error);
    throw new Error('Error fetching products');
  }
};
