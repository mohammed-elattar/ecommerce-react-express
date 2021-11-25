import React from 'react';
import { Row, Col } from 'react-bootstrap';
import MasterPage from '../components/MasterPage';
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
    content = <h1>Loading...</h1>;
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
        <div>
          {error?.status} {JSON.stringify(error?.data)}
        </div>
      ) : (
        <div>{error?.toString()}</div>
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
