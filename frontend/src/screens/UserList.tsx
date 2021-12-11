import React from 'react';
import { Table, Button, Anchor } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCheck,
  faEdit,
  faTimes,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { useListUsersQuery } from '../services/userProfile';
import CustomError from '../types/CustomError';
import { User } from '../services/auth';
import MasterPage from '../components/MasterPage';

const UserListScreen = () => {
  const {
    data: users = [],
    isLoading: loading,
    isError,
    error,
  } = useListUsersQuery();

  const deleteHandler = (id: string) => {
    console.log('delete');
  };

  return (
    <MasterPage>
      <h1>Users</h1>
      {loading ? (
        <Loader />
      ) : isError ? (
        <Message variant='danger'>
          {(error as CustomError).status} {(error as CustomError).data.message}
        </Message>
      ) : (
        <Table striped bordered hover responsive className='table-sm'>
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>EMAIL</th>
              <th>ADMIN</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {users.map((user: User) => (
              <tr key={user._id}>
                <td>{user._id}</td>
                <td>{user.name}</td>
                <td>
                  <a href={`mailto:${user.email}`}>{user.email}</a>
                </td>
                <td>
                  {user.isAdmin ? (
                    <FontAwesomeIcon
                      icon={faCheck}
                      style={{ color: 'green' }}
                    />
                  ) : (
                    <FontAwesomeIcon
                      icon={faTimes}
                      style={{ color: 'green' }}
                    />
                  )}
                </td>
                <td>
                  <Anchor href={`/user/${user._id}/edit`}>
                    <Button variant='light' className='btn-sm'>
                      <FontAwesomeIcon icon={faEdit} />
                    </Button>
                  </Anchor>
                  <Button
                    variant='danger'
                    className='btn-sm'
                    onClick={() => deleteHandler(user._id)}
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </MasterPage>
  );
};

export default UserListScreen;
