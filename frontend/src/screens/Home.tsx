import React from 'react';
import { Row, Col } from 'react-bootstrap';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import Loader from '../components/Loader';
import MasterPage from '../components/MasterPage';
import Message from '../components/Message';
import Paginate from '../components/Paginate';
import Product from '../components/Product';
import ProductCarousel from '../components/ProductCarousel';
import { Product as ProductModel } from '../products';
import { useFetchProductsQuery } from '../store/features/product-api-slice';
const Home: React.FC = () => {
  const { keyword, pageNumber } = useParams();
  const { data, isLoading, isSuccess, isError, error } = useFetchProductsQuery({
    keyword: keyword || '',
    pageNumber: parseInt(pageNumber || '1'),
  });

  let content;

  if (isLoading) {
    content = <Loader />;
  } else if (isSuccess) {
    content = (
      <Row>
        {!keyword ? <ProductCarousel /> : <Link to='/'>Go Back</Link>}
        {data?.data.map((product: ProductModel) => (
          <Col sm='12' md='6' lg='4' xl='3' key={product._id}>
            <Product product={product} />
          </Col>
        ))}
        <Paginate
          page={data?.page || 1}
          pages={data?.pages || 1}
          keyword={''}
        />
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
