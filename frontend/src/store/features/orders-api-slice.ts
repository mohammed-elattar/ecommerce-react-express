import { BaseQueryFn, FetchArgs, createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '..';
import CustomError from '../../types/CustomError';
import { Order } from './order-api-slice';

export const ordersApiSlice = createApi({
  reducerPath: 'ordersApi',
  baseQuery: fetchBaseQuery({baseUrl: '/api', prepareHeaders: (headers, { getState }) => {
    // By default, if we have a token in the store, let's use that for authenticated requests
    const token = (getState() as RootState).auth.userLogin.userInfo?.token
    if (token) {
      headers.set('authorization', `Bearer ${token}`)
    }
    return headers
  },}) as BaseQueryFn<string | FetchArgs, unknown, CustomError, {}>,
  tagTypes: ['Order'],
  endpoints(builder) {
    return {
      fetchOrders: builder.query<Order[], void>({
        query() {
          return '/orders';
        },
        providesTags: (result, error, arg) => {
        return result
          ? [...result.map(({ _id }) => ({ type: 'Order' as const, id: _id })), { type: 'Order', id: 'LIST' }]
          : [{ type: 'Order', id: 'LIST' }];
    }
      }),
    };
  },
});
  
export const { useFetchOrdersQuery} = ordersApiSlice;