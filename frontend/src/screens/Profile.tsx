import React, { useState, useEffect } from 'react';
import { Form, Button, Row, Col, Anchor, Table } from 'react-bootstrap';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { useNavigate } from 'react-router';
import { useAuth } from '../hooks/useAuth';
import CustomError from '../types/CustomError';
import { useUpdateUserProfileMutation } from '../services/userProfile';
import MasterPage from '../components/MasterPage';
import { Order } from '../store/features/order-api-slice';
import { useFetchUserOrdersQuery } from '../store/features/user-orders-slice';

const Profile = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');

  const [updateUserProfile, { isError, isLoading, error, isSuccess }] =
    useUpdateUserProfileMutation();

  const {
    data: orders = [],
    isLoading: loadingOrders,
    isError: orderError,
    error: errorOrders,
  } = useFetchUserOrdersQuery();

  const { user: userInfo } = useAuth();

  useEffect(() => {
    if (!userInfo) {
      navigate({ pathname: '/login' });
    } else {
      setName(userInfo.name);
      setEmail(userInfo.email);
    }
  }, [navigate, userInfo]);

  const submitHandler = async (e: React.SyntheticEvent) => {
    try {
      e.preventDefault();
      if (password !== confirmPassword) {
        throw new Error('passwords do not match');
      } else {
        updateUserProfile({ name, email, password });
      }
    } catch (error: any) {
      setMessage(error?.message || 'Something went wrong');
    }
  };

  const renderMessage = () => {
    if (isError) {
      return (
        <Message variant='danger'>
          <div>
            {(error as CustomError).status}{' '}
            {(error as CustomError).data.message || message}
          </div>
        </Message>
      );
    } else if (message) {
      return (
        <Message variant='danger'>
          <div>{message}</div>
        </Message>
      );
    }

    return;
  };

  return (
    <MasterPage>
      <Row>
        <Col md={3}>
          <h2>User Profile</h2>
          {renderMessage()}
          {isSuccess && <Message variant='success'>Profile Updated</Message>}
          {isLoading ? (
            <Loader />
          ) : (
            <Form onSubmit={submitHandler}>
              <Form.Group controlId='name'>
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type='name'
                  placeholder='Enter name'
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                ></Form.Control>
              </Form.Group>

              <Form.Group controlId='email'>
                <Form.Label>Email Address</Form.Label>
                <Form.Control
                  type='email'
                  placeholder='Enter email'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                ></Form.Control>
              </Form.Group>

              <Form.Group controlId='password'>
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type='password'
                  placeholder='Enter password'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                ></Form.Control>
              </Form.Group>

              <Form.Group controlId='confirmPassword'>
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  type='password'
                  placeholder='Confirm password'
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                ></Form.Control>
              </Form.Group>

              <Button type='submit' variant='primary'>
                Update
              </Button>
            </Form>
          )}
        </Col>
        <Col md={9}>
          <h2>My Orders</h2>
          {loadingOrders ? (
            <Loader />
          ) : orderError ? (
            <Message variant='danger'>
              {(errorOrders as CustomError).status}{' '}
              {(errorOrders as CustomError).data.message}
            </Message>
          ) : (
            <Table striped bordered hover responsive className='table-sm'>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>DATE</th>
                  <th>TOTAL</th>
                  <th>PAID</th>
                  <th>DELIVERED</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order: Order) => (
                  <tr key={order._id}>
                    <td>{order._id}</td>
                    <td>{order.createdAt?.substring(0, 10)}</td>
                    <td>{order.totalPrice}</td>
                    <td>
                      {order.isPaid ? (
                        order.paidAt?.substring(0, 10)
                      ) : (
                        <i
                          className='fas fa-times'
                          style={{ color: 'red' }}
                        ></i>
                      )}
                    </td>
                    <td>
                      {order.isDelivered ? (
                        order.deliveredAt?.substring(0, 10)
                      ) : (
                        <i
                          className='fas fa-times'
                          style={{ color: 'red' }}
                        ></i>
                      )}
                    </td>
                    <td>
                      <Anchor href={`/order/${order._id}`}>
                        <Button className='btn-sm' variant='light'>
                          Details
                        </Button>
                      </Anchor>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </Col>
      </Row>
    </MasterPage>
  );
};

export default Profile;
