import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from './features/product-api-slice';
import { cartSlice } from './features/cart-api-slice';
import authReducer from './features/user-api-slice';
import { api } from '../services/auth'
import { orderSlice } from './features/order-api-slice';
import { orderDetailsApiSlice } from './features/order-details-api-slice';
import { userOrdersSlice } from './features/user-orders-slice';
import { userProfileApi } from '../services/userProfile';
import { ordersApiSlice } from './features/orders-api-slice';

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    [orderDetailsApiSlice.reducerPath]: orderDetailsApiSlice.reducer,
    [api.reducerPath]: api.reducer,
    [userOrdersSlice.reducerPath]: userOrdersSlice.reducer,
    [userProfileApi.reducerPath]: userProfileApi.reducer,
    [ordersApiSlice.reducerPath]: ordersApiSlice.reducer,
    cart: cartSlice.reducer,
    order: orderSlice.reducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat( api.middleware, apiSlice.middleware, orderDetailsApiSlice.middleware,userOrdersSlice.middleware, userProfileApi.middleware, ordersApiSlice.middleware)
  ,
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;