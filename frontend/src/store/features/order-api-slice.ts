import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"
import { RootState } from ".."
import {CartItem} from './cart-api-slice';
export interface Order
{
    orderItems: CartItem [],
    shippingAddress: string,
    paymentMethod: string,
    itemsPrice: string,
    shippingPrice: string,
    taxPrice: string,
    totalPrice: string,
  }

const cartItemsFromStorage = localStorage.getItem('cartItems')
  ? JSON.parse(localStorage.getItem('cartItems') as string)
  : []
export const addOrder = createAsyncThunk(
    'order/add',
    async (order:Order, thunkAPI) => {
      const response = await axios.post(`/api/orders/`, order)
      const {data} = response;

      return {...data};
        }
  )
  
  const initialState = {
    orderItems: [],
    shippingAddress: '',
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
        console.log('order added')
      })
    },
  })


export const selectOrder = (state: RootState) => state.order;