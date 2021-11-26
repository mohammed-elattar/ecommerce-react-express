import React from 'react';
import MasterPage from '../components/MasterPage';
import { Row, Col, Image, ListGroup, Card, Button } from 'react-bootstrap';
import Rating from '../components/Rating';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { useFetchProductQuery } from '../store/features/product-api-slice';
import Loader from '../components/Loader';
import Message from '../components/Message';

const ProductScreen = () => {
  const { id: productId } = useParams();
  const {
    data: product,
    isLoading,
    // isSuccess,
    isError,
    error,
  } = useFetchProductQuery(productId);
  if (isLoading) {
    return (
      <MasterPage>
        <Loader />
      </MasterPage>
    );
  } else if (isError) {
    const content =
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
    return <MasterPage>{content}</MasterPage>;
  }

  return (
    <MasterPage>
      <Link className='btn btn-light my-3' to='/'>
        Go Back
      </Link>
      <Row>
        <Col md='6'>
          <Image src={product?.image} alt={product?.name} fluid />
        </Col>
        <Col md='3'>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h3>{product?.name}</h3>
            </ListGroup.Item>
            <ListGroup.Item>
              <Rating
                value={product?.rating || 0}
                text={`${product?.numReviews} reviews`}
              />
            </ListGroup.Item>
            <ListGroup.Item>Price: {product?.price}</ListGroup.Item>
            <ListGroup.Item>Dription: {product?.description}</ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md='3'>
          <Card>
            <ListGroup>
              <ListGroup.Item>
                <Row>
                  <Col>Price:</Col>
                  <Col>
                    <strong>{product?.price}</strong>
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Status:</Col>
                  <Col>
                    {(product?.countInStock || 0) > 0
                      ? 'In Stock'
                      : 'Out Of Stock'}
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <div className='d-grid gap-2'>
                  <Button
                    className='btn-block'
                    type='button'
                    disabled={(product?.countInStock || 0) === 0}
                  >
                    Add To Cart
                  </Button>
                </div>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </MasterPage>
  );
};

export default ProductScreen;
