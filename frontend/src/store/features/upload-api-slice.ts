import { BaseQueryFn, FetchArgs, createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '..';
import CustomError from '../../types/CustomError';

export const uploadApiSlice = createApi({
  reducerPath: 'uploadApi',
  baseQuery: fetchBaseQuery({baseUrl: '/api', prepareHeaders: (headers, { getState }) => {
    // By default, if we have a token in the store, let's use that for authenticated requests
    const token = (getState() as RootState).auth.userLogin.userInfo?.token
    if (token) {
      headers.set('authorization', `Bearer ${token}`)
    }
    console.log(headers);
    return headers
  },}) as BaseQueryFn<string | FetchArgs, unknown, CustomError, {}>,
  tagTypes: ['Product'],
  endpoints(builder) {
    return {
      uploadImage: builder.mutation({
        query(body) {
          return {
            url: `/uploads`,
            method: 'POST',
            body,
          }
        }
      }),
    };
  },
});
  
export const { useUploadImageMutation } = uploadApiSlice;