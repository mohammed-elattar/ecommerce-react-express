import { BaseQueryFn, FetchArgs, createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '../store'
import CustomError from '../types/CustomError'

export interface User {
    _id: string,
    name: string,
    email: string,
    isAdmin: boolean,
    token: string
}

export interface LoginRequest {
  email: string,
  password: string,
}

export interface RegisterRequest {
    email: string,
    password: string,
    name: string,
  }

export const api = createApi({
    reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api/users/',
    prepareHeaders: (headers, { getState }) => {
      // By default, if we have a token in the store, let's use that for authenticated requests
      const token = (getState() as RootState).auth.userLogin.userInfo?.token
      if (token) {
        headers.set('authorization', `Bearer ${token}`)
      }
      return headers
    },
  }) as BaseQueryFn<string | FetchArgs, unknown, CustomError, {}>,
  endpoints: (builder) => ({
    login: builder.mutation<User, LoginRequest>({
      query: (credentials) => ({
        url: 'login',
        method: 'POST',
        body: credentials,
      }),
    }),
    register: builder.mutation<User, RegisterRequest>({
        query: (credentials) => ({
          url: 'register',
          method: 'POST',
          body: credentials,
        }),
      }),
    protected: builder.mutation<{ message: string }, void>({
      query: () => 'protected',
    }),
  }),

    
})

export const { useLoginMutation, useRegisterMutation, useProtectedMutation } = api
