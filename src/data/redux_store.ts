import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ProductState, Product } from '../components/types';

const initialState: ProductState = {
  data: null,
  loading: false,
  error: null,
};

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    fetchStart: (state) => {
      state.loading = true;
    },
    fetchSuccess: (state, action: PayloadAction<Product>) => {
      state.loading = false;
      state.data = action.payload;
      state.error = null;
    },
    fetchFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { fetchStart, fetchSuccess, fetchFailure } = productSlice.actions;

export default configureStore({
  reducer: {
    product: productSlice.reducer,
  },
});
