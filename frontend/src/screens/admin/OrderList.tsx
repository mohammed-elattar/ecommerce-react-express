import React from 'react';
import { Anchor, Table, Button } from 'react-bootstrap';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import { useFetchOrdersQuery } from '../../store/features/orders-api-slice';
import MasterPage from '../../components/MasterPage';

const OrderList = () => {
  const {
    data: orders = [],
    isLoading,
    // isSuccess,
    isError,
    error,
  } = useFetchOrdersQuery();

  return (
    <MasterPage>
      <h1>Orders</h1>
      {isLoading ? (
        <Loader />
      ) : isError && error && 'status' in error ? (
        <Message variant='danger'>
          {error.status} {error.data.message}
        </Message>
      ) : (
        <Table striped bordered hover responsive className='table-sm'>
          <thead>
            <tr>
              <th>ID</th>
              <th>USER</th>
              <th>DATE</th>
              <th>TOTAL</th>
              <th>PAID</th>
              <th>DELIVERED</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>{order.user && order.user.name}</td>
                <td>{order?.createdAt?.substring(0, 10)}</td>
                <td>${order.totalPrice}</td>
                <td>
                  {order.isPaid ? (
                    order?.paidAt?.substring(0, 10)
                  ) : (
                    <i className='fas fa-times' style={{ color: 'red' }}></i>
                  )}
                </td>
                <td>
                  {order.isDelivered ? (
                    order?.deliveredAt?.substring(0, 10)
                  ) : (
                    <i className='fas fa-times' style={{ color: 'red' }}></i>
                  )}
                </td>
                <td>
                  <Anchor href={`/order/${order._id}`}>
                    <Button variant='light' className='btn-sm'>
                      Details
                    </Button>
                  </Anchor>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </MasterPage>
  );
};

export default OrderList;
