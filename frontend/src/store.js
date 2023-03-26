import { configureStore } from '@reduxjs/toolkit';

import authReducer from './slices/Auth'
import categoryReducer from './slices/category'
import productReducer from './slices/Product'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    category: categoryReducer,
    product: productReducer
  }
  
});