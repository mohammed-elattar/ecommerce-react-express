import React, { SyntheticEvent, useState } from 'react';
import MasterPage from '../components/MasterPage';
import {
  Row,
  Col,
  Image,
  ListGroup,
  Card,
  Button,
  Form,
} from 'react-bootstrap';
import Rating from '../components/Rating';
import { useNavigate, useParams } from 'react-router';
import { Link } from 'react-router-dom';
import {
  useCreateProductReviewMutation,
  useFetchProductQuery,
} from '../store/features/product-api-slice';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { useAuth } from '../hooks/useAuth';
import CustomError from '../types/CustomError';

const ProductScreen = () => {
  const navigate = useNavigate();
  const [qty, setQty] = useState(0);
  const { id: productId } = useParams();
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  const { user: userInfo } = useAuth();

  const [createProductReview, { isError: isReviewError, error: reviewError }] =
    useCreateProductReviewMutation();
  const submitHandler = (e: SyntheticEvent) => {
    e.preventDefault();
    createProductReview({ id: productId || '', body: { rating, comment } });
  };

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

  const addToCartHandler = () => {
    navigate(`/cart/${productId}?qty=${qty === 0 ? 1 : qty}`);
  };

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
              {product && product.countInStock > 0 && (
                <ListGroup.Item>
                  <Row>
                    <Col>Qty</Col>
                    <Col>
                      <Form.Control
                        as='select'
                        value={qty}
                        onChange={(e) => setQty(parseInt(e.target.value))}
                      >
                        {product &&
                          product.countInStock > 0 &&
                          [...Array(product.countInStock).keys()].map((x) => (
                            <option key={x + 1} value={x + 1}>
                              {x + 1}
                            </option>
                          ))}
                      </Form.Control>
                    </Col>
                  </Row>
                </ListGroup.Item>
              )}
              <ListGroup.Item>
                <div className='d-grid gap-2'>
                  <Button
                    className='btn-block'
                    type='button'
                    disabled={(product?.countInStock || 0) === 0}
                    onClick={addToCartHandler}
                  >
                    Add To Cart
                  </Button>
                </div>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>

        <Col md={6}>
          <h2>Reviews</h2>
          {product?.reviews?.length === 0 && (
            <Message variant=''>No Reviews</Message>
          )}
          <ListGroup variant='flush'>
            {product?.reviews?.map((review) => (
              <ListGroup.Item key={review._id}>
                <strong>{review.name}</strong>
                <Rating value={review.rating} text='' />
                <p>{review.createdAt.substring(0, 10)}</p>
                <p>{review.comment}</p>
              </ListGroup.Item>
            ))}
            <ListGroup.Item>
              <h2>Write a Customer Review</h2>
              {isReviewError && (
                <Message variant='danger'>
                  {(reviewError as CustomError).status}{' '}
                  {(reviewError as CustomError).data.message}
                </Message>
              )}
              {userInfo ? (
                <Form onSubmit={submitHandler}>
                  <Form.Group controlId='rating'>
                    <Form.Label>Rating</Form.Label>
                    <Form.Control
                      as='select'
                      value={rating}
                      onChange={(e) => setRating(parseInt(e.target.value))}
                    >
                      <option value=''>Select...</option>
                      <option value='1'>1 - Poor</option>
                      <option value='2'>2 - Fair</option>
                      <option value='3'>3 - Good</option>
                      <option value='4'>4 - Very Good</option>
                      <option value='5'>5 - Excellent</option>
                    </Form.Control>
                  </Form.Group>
                  <Form.Group controlId='comment'>
                    <Form.Label>Comment</Form.Label>
                    <Form.Control
                      as='textarea'
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                    ></Form.Control>
                  </Form.Group>
                  <Button type='submit' variant='primary'>
                    Submit
                  </Button>
                </Form>
              ) : (
                <Message variant=''>
                  Please <Link to='/login'>sign in</Link> to write a review{' '}
                </Message>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
      </Row>
    </MasterPage>
  );
};

export default ProductScreen;
