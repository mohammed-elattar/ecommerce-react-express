import { BaseQueryFn, FetchArgs, createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '..';
import CustomError from '../../types/CustomError';
import { Order } from './order-api-slice';

export const userOrdersSlice = createApi({
  reducerPath: 'userOrdersApi',
  baseQuery: fetchBaseQuery({baseUrl: '/api',  prepareHeaders: (headers, { getState }) => {
    // By default, if we have a token in the store, let's use that for authenticated requests
    const token = (getState() as RootState).auth.userLogin.userInfo?.token
    if (token) {
      headers.set('authorization', `Bearer ${token}`)
    }
    return headers
  },}) as BaseQueryFn<string | FetchArgs, unknown, CustomError, {}>,
  endpoints(builder) {
    return {
      fetchUserOrders: builder.query<Order[], void>({
        query() {
          return '/orders/myorders';
        },
      })
    };
  },
});



  
export const { useFetchUserOrdersQuery} = userOrdersSlice;