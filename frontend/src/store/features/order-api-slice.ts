import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"
import { RootState } from ".."
import { User } from "../../services/auth";
import {CartItem, ShippingAddress} from './cart-api-slice';
export interface Order
{
    _id?: string;
    user?: User;
    isDelivered?: boolean;
    deliveredAt?: string;
    createdAt?: string;
    isPaid?: boolean;
    paidAt?: string;
    orderItems: CartItem [],
    shippingAddress: ShippingAddress,
    paymentMethod: string,
    itemsPrice: string,
    shippingPrice: string,
    taxPrice: string,
    totalPrice: string,
    loading? : boolean,
  }

  const config = {
    headers: {
      'Content-Type': 'application/json',
      'authorization': ``,
    },
  }

export const addOrder = createAsyncThunk(
    'order/add',
    async (order:Order, thunkAPI) => {
        const token = (thunkAPI.getState() as RootState).auth.userLogin.userInfo?.token
        config.headers.authorization = `Bearer ${token}`;
      const response = await axios.post(`/api/orders/`, order, config); 
      const {data} = response;

      return {...data};
        }
  )

  export const payOrder = createAsyncThunk(
    'order/pay',
    async ({orderId, paymentResult}: {orderId: string, paymentResult: any}, thunkAPI) => {
        const token = (thunkAPI.getState() as RootState).auth.userLogin.userInfo?.token
        config.headers.authorization = `Bearer ${token}`;
      const response = await axios.put(`/api/orders/${orderId}/pay`, paymentResult, config); 
      const {data} = response;

      return {...data};
        }
  )

  export const markAsDelivered = createAsyncThunk(
    'order/markAsDelivered',
    async ({orderId}: {orderId: string}, thunkAPI) => {
        const token = (thunkAPI.getState() as RootState).auth.userLogin.userInfo?.token
        config.headers.authorization = `Bearer ${token}`;
      const response = await axios.put(`/api/orders/${orderId}/deliver`,{}, config); 
      const {data} = response;

      return {...data};
        }
  )

  const initialState = {
      _id: '',
    orderItems: [],
    shippingAddress: {address: '', city: '', country: '', postalCode: ''},
    paymentMethod: '',
    itemsPrice: '',
    shippingPrice: '',
    taxPrice: '',
    totalPrice: '',
    loading: false,
    isPaid: false,
    isDelivered: false,
    user: {_id: '',
    name: '',
    email: '',
    isAdmin: false,
    token: ''},
    deliveredAt: '',
    paidAt: '',

  };

  export const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder.addCase(addOrder.pending, (state:Order, action) => {     
        state.loading = true;
    }).addCase(addOrder.fulfilled, (state:Order, action) => {     
        return {...action.payload, loading: false};
    }).addCase(payOrder.fulfilled, (state:Order, action) => {     
        return {...action.payload, loading: false};
    }).addCase(markAsDelivered.pending, (state:Order, action) => {     
        state.loading = true;
    }).addCase(markAsDelivered.fulfilled, (state:Order, action) => {     
        return {...action.payload, loading: false};
    })
    },
  })

export const selectOrder = (state: RootState) => state.order;
export const selectOrderLoading = (state: RootState) => state.order.loading;