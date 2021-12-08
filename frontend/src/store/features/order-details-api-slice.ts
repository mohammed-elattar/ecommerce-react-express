import { BaseQueryFn, FetchArgs, createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '..';
import CustomError from '../../types/CustomError';
import { Order } from './order-api-slice';

export const orderDetailsApiSlice = createApi({
  reducerPath: 'orderDetailsApi',
  baseQuery: fetchBaseQuery({baseUrl: '/api', prepareHeaders: (headers, { getState }) => {
    // By default, if we have a token in the store, let's use that for authenticated requests
    const token = (getState() as RootState).auth.userLogin.userInfo?.token
    if (token) {
      headers.set('authorization', `Bearer ${token}`)
    }
    return headers
  },}) as BaseQueryFn<string | FetchArgs, unknown, CustomError, {}>,
  endpoints(builder) {
    return {
      fetchOrder: builder.query<Order, string|undefined>({
        query(id) {
          return `/orders/${id}`;
        },
      }),
    };
  },
});



  
export const { useFetchOrderQuery } = orderDetailsApiSlice;