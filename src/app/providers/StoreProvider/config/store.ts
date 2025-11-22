import { configureStore, ReducersMapObject } from '@reduxjs/toolkit';
import { StateSchema } from './StateSchema';
import { currentPhotoDocSizeReducer } from 'entities/CurrentPhotoDocSize';
import { productsDataReducer } from 'entities/ProductsData';
import { servicesApi } from 'features/GetProductData/model/api/servicesApi';

export const createReduxStore = (initialState?: StateSchema) => {
   const rootReducers: ReducersMapObject<StateSchema> = {
      currentSize: currentPhotoDocSizeReducer,
      productsData: productsDataReducer,
      //@ts-ignore
      [servicesApi.reducerPath]: servicesApi.reducer,
   };

   return configureStore({
      reducer: rootReducers,
      preloadedState: initialState,
      devTools: true,
      //@ts-ignore
      middleware: getDefaultMiddleware => getDefaultMiddleware().concat(servicesApi.middleware),
   });
};

const store = createReduxStore();

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
