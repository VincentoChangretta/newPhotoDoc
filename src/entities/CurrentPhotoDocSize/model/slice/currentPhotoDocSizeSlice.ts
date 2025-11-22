import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { CurrentPhotoDocSizes, CurrentPhotoDocSizeSchema } from '../types/types';

const initialState: CurrentPhotoDocSizeSchema = {
   currentSize: null,
};

export const currentPhotoDocSizeSlice = createSlice({
   name: 'counter',
   initialState,
   reducers: {
      setSize: (state, action: PayloadAction<CurrentPhotoDocSizes>) => {
         state.currentSize = action.payload;
      },
   },
});

export const { actions: currentPhotoDocSizeActions } = currentPhotoDocSizeSlice;
export const { reducer: currentPhotoDocSizeReducer } = currentPhotoDocSizeSlice;

