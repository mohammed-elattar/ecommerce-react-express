import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"
export interface CartItem { 
    product: string,
  name: string,
  image: string,
  price: string,
  countInStock: number,
  qty: number};
export const addToCart = createAsyncThunk(
    'users/fetchByIdStatus',
    async (cartData:{productId: string, qty: number}, thunkAPI) => {
        const {productId, qty} = cartData;
      const response = await axios.get(`/api/products/${productId}`)
      const {data} = response;
      return { 
          product: data._id,
        name: data.name,
        image: data.image,
        price: data.price,
        countInStock: data.countInStock,
        qty};
        }
  )
  
  const initialState = {
    cartItems: [],
  } as { cartItems: CartItem[] };

  export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        removeFromCart(state, action) { const newCartItems = state.cartItems.filter((cartItem:CartItem) => cartItem.product !== action.payload); state.cartItems = newCartItems;}
    },
    extraReducers: (builder) => {
      builder.addCase(addToCart.fulfilled, (state: {cartItems: CartItem[]}, action) => {
        state.cartItems.push(action.payload);
      })
    },
  })


export const {removeFromCart} = cartSlice.actions;
