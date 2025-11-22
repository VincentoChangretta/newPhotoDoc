import { CurrentPhotoDocSizeSchema } from 'entities/CurrentPhotoDocSize';
import { ProductsDataSchema } from 'entities/ProductsData';

export interface StateSchema {
   currentSize: CurrentPhotoDocSizeSchema;
   productsData: ProductsDataSchema;
}
