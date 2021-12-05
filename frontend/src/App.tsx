import React from 'react';
import Home from './screens/Home';
import Product from './screens/Product';
import CartScreen from './screens/Cart';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginScreen from './screens/Login';
import RegisterScreen from './screens/Register';
import PrivateRoute from './utils/PrivateRoute';
import Profile from './screens/Profile';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/login' element={<LoginScreen />} />
        <Route path='/register' element={<RegisterScreen />} />
        <Route path='/' element={<PrivateRoute />}>
          <Route path='/' element={<Home />} />
          <Route path='/product/:id' element={<Product />} />
          <Route path='/cart/:id' element={<CartScreen />} />
          <Route path='/profile' element={<Profile />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
