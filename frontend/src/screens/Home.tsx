import React from 'react';
import { Row, Col } from 'react-bootstrap';
import Loader from '../components/Loader';
import MasterPage from '../components/MasterPage';
import Message from '../components/Message';
import Product from '../components/Product';
import { Product as ProductModel } from '../products';
import { useFetchProductsQuery } from '../store/features/product-api-slice';
const Home: React.FC = () => {
  const {
    data: products = [],
    isLoading,
    isSuccess,
    isError,
    error,
  } = useFetchProductsQuery();

  let content;

  if (isLoading) {
    content = <Loader />;
  } else if (isSuccess) {
    content = (
      <Row>
        {products.map((product: ProductModel) => (
          <Col sm='12' md='6' lg='4' xl='3' key={product._id}>
            <Product product={product} />
          </Col>
        ))}
      </Row>
    );
  } else if (isError) {
    content =
      error && 'status' in error ? (
        <Message variant='danger'>
          <div>
            {error.status} {error.data.message}
          </div>
        </Message>
      ) : (
        <Message variant='danger'>
          <div>{error?.toString()}</div>
        </Message>
      );
  }
  return (
    <MasterPage>
      <h1>Latest Products</h1>
      {content}
    </MasterPage>
  );
};

export default Home;
