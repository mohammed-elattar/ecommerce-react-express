import React from 'react';
import { Anchor } from 'react-bootstrap';
import { Table, Button, Row, Col } from 'react-bootstrap';
import Loader from '../../components/Loader';
import Message from '../../components/Message';
import { useFetchProductsQuery } from '../../store/features/product-api-slice';
import { Product } from '../../products';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCheck,
  faEdit,
  faPlus,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';

const ProductList = () => {
  const {
    data: products = [],
    isLoading,
    isError,
    error,
  } = useFetchProductsQuery();

  const deleteHandler = (id: string) => {
    if (window.confirm('Are you sure')) {
      // DELETE PRODUCTS
    }
  };

  const createProductHandler = (product: Product) => {
    //   CREATE PRODUCT
  };

  return (
    <>
      <Row className='align-items-center'>
        <Col>
          <h1>Products</h1>
        </Col>
        <Col className='text-right'>
          <Button
            className='my-3'
            //   onClick={() => createProductHandler()}
          >
            <FontAwesomeIcon icon={faPlus} /> Create Product
          </Button>
        </Col>
      </Row>
      {isLoading ? (
        <Loader />
      ) : isError ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <Table striped bordered hover responsive className='table-sm'>
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>PRICE</th>
              <th>CATEGORY</th>
              <th>BRAND</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id}>
                <td>{product._id}</td>
                <td>{product.name}</td>
                <td>${product.price}</td>
                <td>{product.category}</td>
                <td>{product.brand}</td>
                <td>
                  <Anchor href={`/admin/product/${product._id}/edit`}>
                    <Button variant='light' className='btn-sm'>
                      <FontAwesomeIcon icon={faEdit} />
                    </Button>
                  </Anchor>
                  <Button
                    variant='danger'
                    className='btn-sm'
                    onClick={() => deleteHandler(product._id)}
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  );
};

export default ProductList;
