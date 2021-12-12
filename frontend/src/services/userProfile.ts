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
  tagTypes: ['User'],
  endpoints: (build) => ({
    // for logged in user
    getUserProfile: build.query<User, void>({
      query: () => 'users/profile',
    }),
    // get any user details and accessed by admin
    getUserDetails: build.query<User, string>({
        query: (id) => `users/${id}`,
      }),
    listUsers: build.query<User[], void>({
        query: () => 'users',
        providesTags: (result, error, arg) => {
            console.log(result && [...result.map(({ _id }) => ({ type: 'User' as const, id: _id }))]);
        return result
          ? [...result.map(({ _id }) => ({ type: 'User' as const, id: _id }))]
          : ['User'];
    }
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
      deleteUser: build.mutation<{ message: string}, string>({
        query(id) {
          return {
            url: `users/${id}`,
            method: 'DELETE',
          }
        },
        invalidatesTags: (result, error, id) => [{ type: 'User', id }],
      }),
      updateUser: build.mutation<User, Partial<User>>({
        query(data) {
          const { _id, ...body } = data
          return {
            url: `users/${_id}`,
            method: 'PUT',
            body,
          }
        },
        invalidatesTags: (result, error, {_id}) => [{ type: 'User', id: _id }],
      }),
  }),
});

export const { useGetUserProfileQuery, useGetUserDetailsQuery,useListUsersQuery, useUpdateUserProfileMutation, useDeleteUserMutation, useUpdateUserMutation } = userProfileApi;
