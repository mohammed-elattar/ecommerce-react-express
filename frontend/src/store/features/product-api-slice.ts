import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Product } from '../../products';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({baseUrl: '/api'}),
  endpoints(builder) {
    return {
      fetchProducts: builder.query<Product[], void>({
        query() {
          return '/products';
        },
      }),
    };
  },
});

export const { useFetchProductsQuery } = apiSlice;