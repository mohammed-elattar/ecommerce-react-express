import React from 'react';
import Home from './screens/Home';
import Product from './screens/Product';
import CartScreen from './screens/Cart';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginScreen from './screens/Login';
import RegisterScreen from './screens/Register';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route index element={<Home />} />
        <Route path='/login' element={<LoginScreen />} />
        <Route path='/register' element={<RegisterScreen />} />
        <Route path='/product/:id' element={<Product />} />
        <Route path='/cart/:id' element={<CartScreen />} />
      </Routes>
    </Router>
  );
};

export default App;
