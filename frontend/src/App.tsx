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
import ProductList from './screens/ProductList';
import UserList from './screens/UserList';
import OrderList from './screens/OrderList';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/login' element={<LoginScreen />} />
        <Route path='/register' element={<RegisterScreen />} />
        <Route path='/' element={<PrivateRoute />}>
          <Route path='/' element={<Home />} />
          <Route path='/admin/productlist' element={<ProductList />} />
          <Route path='/admin/userlist' element={<UserList />} />
          <Route path='/admin/orderlist' element={<OrderList />} />
          <Route path='/product/:id' element={<Product />} />
          <Route path='/order/:id' element={<Order />} />
          <Route path='/cart/:id' element={<CartScreen />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/shipping' element={<Shipping />} />
          <Route path='/payment' element={<Payment />} />
          <Route path='/placeorder' element={<PlaceOrder />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
