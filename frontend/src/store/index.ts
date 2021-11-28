import { configureStore } from '@reduxjs/toolkit';
// import counterReducer from '../features/counter/counter-slice';
import { apiSlice } from './features/product-api-slice';
import { cartSlice } from './features/cart-api-slice';

export const store = configureStore({
  reducer: {
    // counter: counterReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
    cart: cartSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(apiSlice.middleware);
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;