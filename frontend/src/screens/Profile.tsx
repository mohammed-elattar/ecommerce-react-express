import React, { useState, useEffect } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { useNavigate } from 'react-router';
import { useAuth } from '../hooks/useAuth';
import CustomError from '../types/CustomError';
import { useUpdateUserProfileMutation } from '../services/userProfile';
import MasterPage from '../components/MasterPage';

const Profile = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');

  const [updateUserProfile, { isError, isLoading, error, isSuccess }] =
    useUpdateUserProfileMutation();

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
        </Col>
      </Row>
    </MasterPage>
  );
};

export default Profile;
