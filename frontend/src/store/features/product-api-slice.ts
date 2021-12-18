import { BaseQueryFn, FetchArgs, createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '..';
import { Product } from '../../products';
import CustomError from '../../types/CustomError';

export const apiSlice = createApi({
  reducerPath: 'productApi',
  baseQuery: fetchBaseQuery({baseUrl: '/api', prepareHeaders: (headers, { getState }) => {
    // By default, if we have a token in the store, let's use that for authenticated requests
    const token = (getState() as RootState).auth.userLogin.userInfo?.token
    if (token) {
      headers.set('authorization', `Bearer ${token}`)
    }
    return headers
  },}) as BaseQueryFn<string | FetchArgs, unknown, CustomError, {}>,
  tagTypes: ['Product'],
  endpoints(builder) {
    return {
      fetchProducts: builder.query<Product[], string>({
        query(keyword = '') {
          return `/products?keyword=${keyword}`;
        },
        providesTags: (result, error, arg) => {
        return result
          ? [...result.map(({ _id }) => ({ type: 'Product' as const, id: _id })), { type: 'Product', id: 'LIST' }]
          : [{ type: 'Product', id: 'LIST' }];
    }
      }),
      addProduct: builder.mutation<Product, Partial<Product>>({
        query(body) {
          return {
            url: `/products`,
            method: 'POST',
            body,
          }
        },
        // Invalidates all Post-type queries providing the `LIST` id - after all, depending of the sort order,
        // that newly created post could show up in any lists.
        invalidatesTags: [{ type: 'Product', id: 'LIST' }],
      }),
      fetchProduct: builder.query<Product, string|undefined>({
        query(id) {
          return `/products/${id}`;
        },
        providesTags: (result, error, arg) => {
            return [{ type: 'Product', id: result?._id }, { type: 'Product', id: 'LIST' }]
        }
      }),
      deleteProduct: builder.mutation<{ message: string}, string>({
        query(id) {
          return {
            url: `products/${id}`,
            method: 'DELETE',
          }
        },
        invalidatesTags: (result, error, id) => [{ type: 'Product', id }],
      }),
      updateProduct: builder.mutation<Product, Partial<Product>>({
        query(data) {
            const { _id, ...body } = data;
          return {
            url: `products/${_id}`,
            method: 'PUT',
            body,
          }
        },
        invalidatesTags: (result, error, {_id}) => [{ type: 'Product', id: _id }],
      }),
      createProductReview: builder.mutation<{ message: string}, {id: string, body:{rating: number, comment?: string}}>({
        query({id, body}) {
          return {
            url: `products/${id}/reviews`,
            method: 'POST',
            body
          }
        },
        invalidatesTags: [{ type: 'Product', id: 'LIST' }],
      }),
    };
  },
});
  
export const { useFetchProductsQuery, useFetchProductQuery,useAddProductMutation, useDeleteProductMutation, useUpdateProductMutation, useCreateProductReviewMutation } = apiSlice;