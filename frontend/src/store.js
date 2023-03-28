import { configureStore } from '@reduxjs/toolkit';

import authReducer from './slices/Auth'
import categoryReducer from './slices/category'
import productReducer from './slices/Product'
import { logger } from 'redux-logger';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    category: categoryReducer,
    product: productReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger)
  
});