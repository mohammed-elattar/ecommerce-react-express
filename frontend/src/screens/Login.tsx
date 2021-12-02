import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import FormContainer from '../components/FormContainer';
import { useLoginMutation } from '../services/auth';
import { useAuth } from '../hooks/useAuth';
import MasterPage from '../components/MasterPage';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();
  const dispatch = useDispatch();
  let [searchParams] = useSearchParams();

  const [login, { isLoading, isError, error }] = useLoginMutation();

  //   const userLogin = useSelector((state) => state.userLogin);
  //   const { loading, error, userInfo } = userLogin;
  const redirectUrl = searchParams.get('redirect');
  const redirect = null !== redirectUrl ? redirectUrl : '/';
  const { user } = useAuth();
  useEffect(() => {
    console.log(user);
    if (user) {
      navigate({ pathname: redirect });
    }
  }, [navigate, user, redirect]);

  const submitHandler = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    await login({ email, password }).unwrap();
  };

  return (
    <MasterPage>
      <FormContainer>
        <h1>Sign In</h1>
        {isError && <Message variant='danger'>{error}</Message>}
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
