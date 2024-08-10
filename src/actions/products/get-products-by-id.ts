import { tesloApi } from '@/src/config/api/tesloApi';
import { Gender, Product } from '@/src/domain/entities/product';
import { ProductMapper } from '@/src/infrastructure/interfaces/mappers/product.mapper';
import { TesloProduct } from '@/src/infrastructure/interfaces/teslo-products.response';

const emptyProduct: Product = {
  id: '',
  title: '',
  price: 0,
  description: '',
  images: [],
  slug: '',
  gender: Gender.Unisex,
  sizes: [],
  stock: 0,
  tags: [],
};

export const getProductById = async (id: string): Promise<Product> => {
  if (id === 'new') return emptyProduct;
  try {
    const { data } = await tesloApi.get<TesloProduct>(`/products/${id}`);
    return ProductMapper.testloProductToEntity(data);
  } catch (error) {
    console.log(error);
    throw new Error('Error getting product by id');
  }
};
