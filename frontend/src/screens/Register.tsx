import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import Message from '../components/Message';
import Loader from '../components/Loader';
import FormContainer from '../components/FormContainer';
import { useRegisterMutation } from '../services/auth';
import { useAuth } from '../hooks/useAuth';
import MasterPage from '../components/MasterPage';
import CustomError from '../types/CustomError';

const RegisterScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  let [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const { user: userInfo } = useAuth();
  const [register, { isError, isLoading, error }] = useRegisterMutation();
  const redirectUrl = searchParams.get('redirect');
  const redirect = null !== redirectUrl ? redirectUrl : '/';

  useEffect(() => {
    if (userInfo) {
      navigate({ pathname: redirect });
    }
  }, [navigate, userInfo, redirect]);

  const submitHandler = async (e: React.SyntheticEvent) => {
    try {
      e.preventDefault();
      if (password !== confirmPassword) {
        throw new Error('passwords do not match');
      } else {
        await register({ name, email, password }).unwrap();
      }
    } catch (error: any) {
      setMessage(error?.message || 'Something went wrong');
    }
  };

  return (
    <MasterPage>
      <FormContainer>
        <h1>Sign Up</h1>
        {message && (
          <Message variant='danger'>
            <div>{message}</div>
          </Message>
        )}

        {isError && (
          <Message variant='danger'>
            <div>
              {(error as CustomError).status}{' '}
              {(error as CustomError).data.message}
            </div>
          </Message>
        )}

        {isLoading && <Loader />}
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
            Register
          </Button>
        </Form>

        <Row className='py-3'>
          <Col>
            Have an Account?{' '}
            <Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>
              Login
            </Link>
          </Col>
        </Row>
      </FormContainer>
    </MasterPage>
  );
};

export default RegisterScreen;
