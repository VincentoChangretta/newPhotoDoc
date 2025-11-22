import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { ProductsDataSchema } from '../types/types';

const initialState: ProductsDataSchema = {
   photoDocData: null,
};

export const productsDataSlice = createSlice({
   name: 'counter',
   initialState,
   reducers: {
      setPhotoDocData: (state, action: PayloadAction<any[]>) => {
         state.photoDocData = action.payload;
      },
   },
});

export const { actions: productsDataActions } = productsDataSlice;
export const { reducer: productsDataReducer } = productsDataSlice;
