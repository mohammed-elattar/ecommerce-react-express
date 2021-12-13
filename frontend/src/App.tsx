import React from 'react';
import Home from './screens/Home';
import Product from './screens/Product';
import CartScreen from './screens/Cart';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginScreen from './screens/Login';
import RegisterScreen from './screens/Register';
import PrivateRoute from './utils/PrivateRoute';
import Profile from './screens/Profile';
import Shipping from './screens/Shipping';
import Payment from './screens/Payment';
import PlaceOrder from './screens/PlaceOrder';
import Order from './screens/Order';
import AdminRoute from './utils/AdminRoute';
import ProductList from './screens/admin/ProductList';
import UserList from './screens/admin/UserList';
import OrderList from './screens/admin/OrderList';
import UserEdit from './screens/admin/UserEdit';
import ProductEdit from './screens/admin/ProductEdit';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/login' element={<LoginScreen />} />
        <Route path='/register' element={<RegisterScreen />} />

        <Route path='/' element={<PrivateRoute />}>
          <Route path='/' element={<Home />} />
          <Route path='/product/:id' element={<Product />} />
          <Route path='/order/:id' element={<Order />} />
          <Route path='/cart/:id' element={<CartScreen />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/shipping' element={<Shipping />} />
          <Route path='/payment' element={<Payment />} />
          <Route path='/placeorder' element={<PlaceOrder />} />
        </Route>

        <Route path='/' element={<AdminRoute />}>
          <Route path='/admin/productlist' element={<ProductList />} />
          <Route path='/admin/product/:id/edit' element={<ProductEdit />} />
          <Route path='/admin/userlist' element={<UserList />} />
          <Route path='/admin/orderlist' element={<OrderList />} />
          <Route path='/admin/user/:id/edit' element={<UserEdit />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
