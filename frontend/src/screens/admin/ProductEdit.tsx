import React, { useState, useEffect, SyntheticEvent } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import FormContainer from '../../components/FormContainer';
import {
  useFetchProductQuery,
  useUpdateProductMutation,
} from '../../store/features/product-api-slice';
import MasterPage from '../../components/MasterPage';

const ProductEdit = () => {
  const { id: productId } = useParams();
  const {
    data: product,
    isLoading,
    // isSuccess,
    isError,
    error,
  } = useFetchProductQuery(productId);
  const [updateProduct] = useUpdateProductMutation();

  const [isUpdated, setIsUpdated] = useState(false);
  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState('');
  const [brand, setBrand] = useState('');
  const [category, setCategory] = useState('');
  const [countInStock, setCountInStock] = useState(0);
  const [description, setDescription] = useState('');

  useEffect(() => {
    setName(product?.name || '');
    setPrice(product?.price || 0);
    setImage(product?.image || '');
    setBrand(product?.brand || '');
    setCategory(product?.category || '');
    setCountInStock(product?.countInStock || 0);
    setDescription(product?.description || '');
  }, [product]);

  const submitHandler = (e: SyntheticEvent) => {
    e.preventDefault();
    updateProduct({
      _id: product?._id,
      name,
      price,
      image,
      brand,
      category,
      countInStock,
      description,
    }).then(() => setIsUpdated(true));
  };

  return (
    <MasterPage>
      <Link to='/admin/productlist' className='btn btn-light my-3'>
        Go Back
      </Link>
      <FormContainer>
        <h1>Edit Product</h1>
        {isUpdated && (
          <Message variant='success'>Product Updated Successfully</Message>
        )}
        {isLoading ? (
          <Loader />
        ) : isError && error && 'status' in error ? (
          <Message variant='danger'>
            {error.status} {error.data.message}
          </Message>
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

            <Form.Group controlId='price'>
              <Form.Label>Price</Form.Label>
              <Form.Control
                type='number'
                placeholder='Enter price'
                value={price}
                onChange={(e) => setPrice(parseFloat(e.target.value))}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='image'>
              <Form.Label>Image</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter image url'
                value={image}
                onChange={(e) => setImage(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='brand'>
              <Form.Label>Brand</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter brand'
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='countInStock'>
              <Form.Label>Count In Stock</Form.Label>
              <Form.Control
                type='number'
                placeholder='Enter countInStock'
                value={countInStock}
                onChange={(e) => setCountInStock(parseInt(e.target.value))}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='category'>
              <Form.Label>Category</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter category'
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='description'>
              <Form.Label>Description</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter description'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Button type='submit' variant='primary'>
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
    </MasterPage>
  );
};

export default ProductEdit;
