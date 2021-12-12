import React, { useState, useEffect, SyntheticEvent } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import FormContainer from '../../components/FormContainer';
import {
  useGetUserDetailsQuery,
  useUpdateUserMutation,
} from '../../services/userProfile';
import MasterPage from '../../components/MasterPage';

const UserEdit = () => {
  const navigate = useNavigate();
  const { id: userId } = useParams();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);

  const {
    data: userDetails,
    isLoading,
    error,
    isError,
  } = useGetUserDetailsQuery(userId || '');

  const [
    updateUser, // This is the mutation trigger
  ] = useUpdateUserMutation();

  useEffect(() => {
    setName(userDetails?.name || '');
    setEmail(userDetails?.email || '');
    setIsAdmin(userDetails?.isAdmin || false);
  }, [userDetails?.email, userDetails?.isAdmin, userDetails?.name]);

  const submitHandler = (e: SyntheticEvent) => {
    e.preventDefault();
    updateUser({ _id: userId, name, email, isAdmin });
    navigate('/admin/userlist');
  };

  return (
    <MasterPage>
      <Link to='/admin/userlist' className='btn btn-light my-3'>
        Go Back
      </Link>
      <FormContainer>
        <h1>Edit User</h1>
        {isLoading ? (
          <Loader />
        ) : isError ? (
          <Message variant='danger'>{error}</Message>
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

            <Form.Group controlId='isadmin'>
              <Form.Check
                type='checkbox'
                label='Is Admin'
                checked={isAdmin}
                onChange={(e) => setIsAdmin(e.target.checked)}
              ></Form.Check>
            </Form.Group>

            <Button type='submit' variant='primary' className='my-3'>
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
    </MasterPage>
  );
};

export default UserEdit;
