import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"
import { RootState } from ".."
import {CartItem, ShippingAddress} from './cart-api-slice';
import { userInfoFromStorage } from "./user-api-slice";
export interface Order
{
    orderItems: CartItem [],
    shippingAddress: ShippingAddress,
    paymentMethod: string,
    itemsPrice: string,
    shippingPrice: string,
    taxPrice: string,
    totalPrice: string,
  }

  const config = {
    headers: {
      'Content-Type': 'application/json',
      'authorization': `Bearer ${userInfoFromStorage?.token || ''}`,
    },
  }


export const addOrder = createAsyncThunk(
    'order/add',
    async (order:Order, thunkAPI) => {
      const response = await axios.post(`/api/orders/`, order, config); 
      const {data} = response;

      return {...data};
        }
  )
  
  const initialState = {
    orderItems: [],
    shippingAddress: {address: '', city: '', country: ''},
    paymentMethod: '',
    itemsPrice: '',
    shippingPrice: '',
    taxPrice: '',
    totalPrice: '',
  } as Order;

  export const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder.addCase(addOrder.fulfilled, (state:Order, action) => {     
      })
    },
  })


export const selectOrder = (state: RootState) => state.order;