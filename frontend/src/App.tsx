import React from 'react';
import Home from './screens/Home';
import Product from './screens/Product';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route index element={<Home />} />
        <Route path='/product/:id' element={<Product />} />
      </Routes>
    </Router>
  );
};

export default App;
