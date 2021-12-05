import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"
import { act } from "react-dom/test-utils"
import { RootState } from ".."
export interface CartItem { 
    product: string,
  name: string,
  image: string,
  price: string,
  countInStock: number,
  qty: number
};

export interface ShippingAddress {
    address: string, 
    city:string,
     postalCode?:string,
      country:string,
}
const cartItemsFromStorage = localStorage.getItem('cartItems')
  ? JSON.parse(localStorage.getItem('cartItems') as string)
  : []
const shippingAddressFromStorage = localStorage.getItem('shippingAddress')
  ? JSON.parse(localStorage.getItem('shippingAddress') as string)
  : []

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
    cartItems: cartItemsFromStorage,
    shippingAddress: shippingAddressFromStorage
  } as { cartItems: CartItem[], shippingAddress: ShippingAddress };

  export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        removeFromCart(state, action) { const newCartItems = state.cartItems.filter((cartItem:CartItem) => cartItem.product !== action.payload); state.cartItems = newCartItems;},
        saveShippingAddress(state, action) {state.shippingAddress = action.payload; localStorage.setItem('shippingAddress', JSON.stringify(state.shippingAddress))}
    },
    extraReducers: (builder) => {
      builder.addCase(addToCart.fulfilled, (state: {cartItems: CartItem[]}, action) => {
        state.cartItems.push(action.payload);
        localStorage.setItem('cartItems', JSON.stringify(state.cartItems))
      })
    },
  })


export const {removeFromCart, saveShippingAddress} = cartSlice.actions;
export const selectShippingAddress = (state: RootState) => state.cart.shippingAddress;
export const selectCartItems = (state: RootState) => state.cart.cartItems;