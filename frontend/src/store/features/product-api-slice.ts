import { BaseQueryFn, FetchArgs, createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Product } from '../../products';
import CustomError from '../../types/CustomError';

export const apiSlice = createApi({
  reducerPath: 'productApi',
  baseQuery: fetchBaseQuery({baseUrl: '/api'}) as BaseQueryFn<string | FetchArgs, unknown, CustomError, {}>,
  endpoints(builder) {
    return {
      fetchProducts: builder.query<Product[], void>({
        query() {
          return '/products';
        },
      }),
      fetchProduct: builder.query<Product, string|undefined>({
        query(id) {
          return `/products/${id}`;
        },
      }),
    };
  },
});



  
export const { useFetchProductsQuery, useFetchProductQuery } = apiSlice;