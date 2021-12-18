import React from 'react';
import { Link } from 'react-router-dom';
import { Carousel, Image } from 'react-bootstrap';
import { useFetchTopProductsQuery } from '../store/features/product-api-slice';
import Loader from './Loader';
import Message from './Message';
const ProductCarousel = () => {
  const {
    data: products,
    isLoading: loading,
    error,
    isError,
  } = useFetchTopProductsQuery();
  return loading ? (
    <Loader />
  ) : isError && error && 'status' in error ? (
    <Message variant='danger'>
      {error.status} {error.data.message}
    </Message>
  ) : (
    <Carousel pause='hover' className='bg-dark'>
      {products?.map((product) => (
        <Carousel.Item key={product._id}>
          <Link to={`/product/${product._id}`}>
            <Image src={product.image} alt={product.name} fluid />
            <Carousel.Caption className='carousel-caption'>
              <h2>
                {product.name} (${product.price})
              </h2>
            </Carousel.Caption>
          </Link>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default ProductCarousel;
