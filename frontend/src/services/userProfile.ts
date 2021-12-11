import { BaseQueryFn, FetchArgs, createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '../store';
import CustomError from '../types/CustomError';
import { RegisterRequest, User } from './auth';

export const userProfileApi = createApi({
  reducerPath: 'userProfile',
  baseQuery: fetchBaseQuery({baseUrl: '/api', prepareHeaders: (headers, { getState }) => {
    // By default, if we have a token in the store, let's use that for authenticated requests
    const token = (getState() as RootState).auth.userLogin.userInfo?.token
    if (token) {
      headers.set('authorization', `Bearer ${token}`)
    }
    return headers
  },}) as BaseQueryFn<string | FetchArgs, unknown, CustomError, {}>,
  endpoints: (build) => ({
    getUserProfile: build.query<User, void>({
      query: () => 'users/profile',
    }),
    listUsers: build.query<User[], void>({
        query: () => 'users',
      }),
    updateUserProfile: build.mutation<User, RegisterRequest>({
        query(updatedUserData) {
          return {
            url: `users/profile`,
            method: 'PUT',
            body: updatedUserData,
          };
        },
      }),
  }),
});

export const { useGetUserProfileQuery, useListUsersQuery, useUpdateUserProfileMutation } = userProfileApi;
