import { configureStore } from '@reduxjs/toolkit';
// import counterReducer from '../features/counter/counter-slice';
import { apiSlice } from './features/product-api-slice';
import { cartSlice } from './features/cart-api-slice';
import authReducer from './features/user-api-slice';
import { api } from '../services/auth'

export const store = configureStore({
  reducer: {
    // counter: counterReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
    [api.reducerPath]: api.reducer,
    cart: cartSlice.reducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat( api.middleware)
  ,
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;