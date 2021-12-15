import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Row, Col, ListGroup, Image, Card, Button } from 'react-bootstrap';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { useFetchOrderQuery } from '../store/features/order-details-api-slice';
import MasterPage from '../components/MasterPage';
import { CartItem } from '../store/features/cart-api-slice';
import axios from 'axios';
import { PayPalButton } from 'react-paypal-button-v2';
import {
  markAsDelivered,
  payOrder,
  selectOrder,
  selectOrderLoading,
} from '../store/features/order-api-slice';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../store';

const OrderScreen = () => {
  const dispatch = useDispatch<AppDispatch>();
  const order = useSelector(selectOrder);
  const loading = useSelector(selectOrderLoading);
  const { id: orderId } = useParams();
  const [sdkReady, setSdkReady] = useState(false);

  let content;

  const successPaymentHandler = async (paymentResult: any) => {
    try {
      if (orderId) {
        await dispatch(payOrder({ orderId, paymentResult }));
      }
    } catch (error) {
      content = (
        <Message variant='danger'>
          <div>{(error as any).message}</div>
        </Message>
      );
    }
  };

  const deliverHandler = async () => {
    try {
      if (orderId) {
        await dispatch(markAsDelivered({ orderId }));
      }
    } catch (error) {
      content = (
        <Message variant='danger'>
          <div>{(error as any).message}</div>
        </Message>
      );
    }
  };

  const { isError, error } = useFetchOrderQuery(orderId);
  if (order.loading) {
    content = (
      <MasterPage>
        <Loader />
      </MasterPage>
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

  useEffect(() => {
    const addPayPalScript = async () => {
      const { data: clientId } = await axios.get('/api/config/paypal');
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`;
      script.async = true;
      script.onload = () => {
        setSdkReady(true);
      };
      document.body.appendChild(script);
    };
    if (!order?.isPaid) {
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      if (!(window as any).paypal) {
        addPayPalScript();
      } else {
        setSdkReady(true);
      }
    }
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
  }, [order?.isPaid]);

  if (order === undefined)
    return (
      <MasterPage>
        <Loader />
      </MasterPage>
    );
  return (
    <MasterPage>
      {content ? (
        { content }
      ) : (
        <>
          <h1>Order {order?._id}</h1>
          <Row>
            <Col md={8}>
              <ListGroup variant='flush'>
                <ListGroup.Item>
                  <h2>Shipping</h2>
                  <p>
                    <strong>Name: </strong> {order.user?.name}
                  </p>
                  <p>
                    <strong>Email: </strong>{' '}
                    <a href={`mailto:${order.user?.email}`}>
                      {order.user?.email}
                    </a>
                  </p>
                  <p>
                    <strong>Address:</strong>
                    {order.shippingAddress.address},{' '}
                    {order.shippingAddress.city}{' '}
                    {order.shippingAddress.postalCode},{' '}
                    {order.shippingAddress.country}
                  </p>
                  {order.isDelivered ? (
                    <Message variant='success'>
                      Delivered on {order.deliveredAt}
                    </Message>
                  ) : (
                    <Message variant='danger'>Not Delivered</Message>
                  )}
                </ListGroup.Item>

                <ListGroup.Item>
                  <h2>Payment Method</h2>
                  <p>
                    <strong>Method: </strong>
                    {order.paymentMethod}
                  </p>
                  {order.isPaid ? (
                    <Message variant='success'>Paid on {order.paidAt}</Message>
                  ) : (
                    <Message variant='danger'>Not Paid</Message>
                  )}
                </ListGroup.Item>

                <ListGroup.Item>
                  <h2>Order Items</h2>
                  {order.orderItems.length === 0 ? (
                    <Message variant='danger'>Order is empty</Message>
                  ) : (
                    <ListGroup variant='flush'>
                      {order.orderItems.map((item: CartItem, index: number) => (
                        <ListGroup.Item key={index}>
                          <Row>
                            <Col md={1}>
                              <Image
                                src={item.image}
                                alt={item.name}
                                fluid
                                rounded
                              />
                            </Col>
                            <Col>
                              <Link to={`/product/${item.product}`}>
                                {item.name}
                              </Link>
                            </Col>
                            <Col md={4}>
                              {item.qty} x ${item.price} = $
                              {item.qty * parseFloat(item.price)}
                            </Col>
                          </Row>
                        </ListGroup.Item>
                      ))}
                    </ListGroup>
                  )}
                </ListGroup.Item>
              </ListGroup>
            </Col>
            <Col md={4}>
              <Card>
                <ListGroup variant='flush'>
                  <ListGroup.Item>
                    <h2>Order Summary</h2>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Items</Col>
                      <Col>${order.itemsPrice}</Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Shipping</Col>
                      <Col>${order.shippingPrice}</Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Tax</Col>
                      <Col>${order.taxPrice}</Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Total</Col>
                      <Col>${order.totalPrice}</Col>
                    </Row>
                  </ListGroup.Item>
                  {!order.isPaid && (
                    <ListGroup.Item>
                      {loading && <Loader />}
                      {!sdkReady ? (
                        <Loader />
                      ) : (
                        <PayPalButton
                          amount={order.totalPrice}
                          onSuccess={successPaymentHandler}
                        />
                      )}
                    </ListGroup.Item>
                  )}

                  {loading && <Loader />}
                  {order.isPaid && !order.isDelivered && (
                    <ListGroup.Item>
                      <Button
                        type='button'
                        className='btn btn-block'
                        onClick={deliverHandler}
                      >
                        Mark As Delivered
                      </Button>
                    </ListGroup.Item>
                  )}
                </ListGroup>
              </Card>
            </Col>
          </Row>
        </>
      )}
    </MasterPage>
  );
};

export default OrderScreen;
