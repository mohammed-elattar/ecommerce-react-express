import React from 'react';
import { Anchor } from 'react-bootstrap';
import { Table, Button, Row, Col } from 'react-bootstrap';
import Loader from '../../components/Loader';
import Message from '../../components/Message';
import {
  useAddProductMutation,
  useDeleteProductMutation,
  useFetchProductsQuery,
} from '../../store/features/product-api-slice';
import { Product } from '../../products';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import MasterPage from '../../components/MasterPage';

const ProductList = () => {
  const {
    data: products = [],
    isLoading,
    isError,
    error,
  } = useFetchProductsQuery();

  const [deleteProduct] = useDeleteProductMutation();
  const [addProduct] = useAddProductMutation();
  const deleteHandler = (id: string) => {
    if (window.confirm('Are you sure')) {
      deleteProduct(id);
    }
  };
  const dummyProduct: Partial<Product> = {
    name: 'Sample name',
    price: 150,
    image: '/images/sample.jpg',
    brand: 'Sample brand',
    category: 'Sample category',
    countInStock: 0,
    numReviews: 0,
    description: 'Sample description',
  };
  const createProductHandler = (product: Partial<Product>) => {
    addProduct(dummyProduct);
  };

  return (
    <MasterPage>
      <Row className='align-items-center'>
        <Col>
          <h1>Products</h1>
        </Col>
        <Col>
          <Button
            className='my-3 '
            style={{ float: 'right' }}
            onClick={() => createProductHandler(dummyProduct)}
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
    </MasterPage>
  );
};

export default ProductList;
