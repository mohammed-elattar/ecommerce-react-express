import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import MasterPage from '../components/MasterPage';
import Product from '../components/Product';
import { Product as ProductModel } from '../products';

const Home: React.FC = () => {
  const [products, setProducts] = useState<ProductModel[]>([]);
  const fetchProducts = async () => {
    const { data } = await axios.get('/api/products');
    setProducts(data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);
  return (
    <MasterPage>
      <h1>Latest Products</h1>
      <Row>
        {products.map((product: ProductModel) => (
          <Col sm='12' md='6' lg='4' xl='3' key={product._id}>
            <Product product={product} />
          </Col>
        ))}
      </Row>
    </MasterPage>
  );
};

export default Home;
