import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import Message from '../components/Message';
import Loader from '../components/Loader';
import FormContainer from '../components/FormContainer';
import { useLoginMutation } from '../services/auth';
import { useAuth } from '../hooks/useAuth';
import MasterPage from '../components/MasterPage';
import CustomError from '../types/CustomError';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();
  let [searchParams] = useSearchParams();

  const [login, { isLoading, isError, error }] = useLoginMutation();

  const redirectUrl = searchParams.get('redirect');
  const redirect = null !== redirectUrl ? redirectUrl : '/';
  const { user: userInfo } = useAuth();
  useEffect(() => {
    if (userInfo) {
      navigate({ pathname: redirect });
    }
  }, [navigate, userInfo, redirect]);

  let message = isError && (
    <Message variant='danger'>
      <div>
        {(error as CustomError).status} {(error as CustomError).data.message}
      </div>
    </Message>
  );

  const submitHandler = async (e: React.SyntheticEvent) => {
    try {
      e.preventDefault();
      await login({ email, password }).unwrap();
      navigate({ pathname: redirect });
    } catch (error: any) {
      message = (
        <Message variant='danger'>
          {error?.message || 'Something went wrong'}
        </Message>
      );
    }
  };

  return (
    <MasterPage>
      <FormContainer>
        <h1>Sign In</h1>
        {message}
        {isLoading && <Loader />}
        <Form onSubmit={submitHandler}>
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

          <Button type='submit' variant='primary'>
            Sign In
          </Button>
        </Form>

        <Row className='py-3'>
          <Col>
            New Customer?{' '}
            <Link
              to={redirect ? `/register?redirect=${redirect}` : '/register'}
            >
              Register
            </Link>
          </Col>
        </Row>
      </FormContainer>
    </MasterPage>
  );
};

export default LoginScreen;
