import { createSlice } from '@reduxjs/toolkit'
import { api, User } from '../../services/auth'
import { userProfileApi } from '../../services/userProfile';
import type { RootState } from '../index';

const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo') as string)
  : null
  
type AuthState = {
    userLogin: {userInfo : User | null },
}

const slice = createSlice({
  name: 'auth',
  initialState: { userLogin: {userInfo: userInfoFromStorage}} as AuthState,
  reducers: {
      logout(state) {
        localStorage.removeItem('userInfo');
        localStorage.removeItem('cartItems');
        state.userLogin.userInfo = null;
      }
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      api.endpoints.login.matchFulfilled,
      (state, { payload }) => {
        state.userLogin.userInfo = payload;
        localStorage.setItem('userInfo', JSON.stringify(payload));
      },
    ).addMatcher(
        api.endpoints.register.matchFulfilled,
      (state, { payload }) => {
        state.userLogin.userInfo = payload;
        localStorage.setItem('userInfo', JSON.stringify(payload));
      }
    ).addMatcher(
        userProfileApi.endpoints.updateUserProfile.matchFulfilled,
      (state, { payload }) => {
        state.userLogin.userInfo = payload;
        localStorage.setItem('userInfo', JSON.stringify(payload));
      }
    )
  },
})

export default slice.reducer;

export const {logout} = slice.actions;
export const selectCurrentUser = (state: RootState) => state.auth.userLogin.userInfo;
