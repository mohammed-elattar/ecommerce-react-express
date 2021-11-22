import React, { useState, useEffect } from 'react';
import MasterPage from '../components/MasterPage';
import { Row, Col, Image, ListGroup, Card, Button } from 'react-bootstrap';
import products, { Product } from '../products';
import Rating from '../components/Rating';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import axios from 'axios';

const ProductScreen = () => {
  const { id: productId } = useParams();

  const [product, setProduct] = useState<Product>();
  const fetchProduct = async () => {
    const { data } = await axios.get(`/api/products/${productId}`);

    setProduct(data);
  };

  useEffect(() => {
    fetchProduct();
  }, []);
  return (
    <MasterPage>
      <Link className='btn btn-light my-3' to='/'>
        Go Back
      </Link>
      <Row>
        <Col md='6'>
          <Image src={product?.image} alt={product?.name} fluid />
        </Col>
        <Col md='3'>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h3>{product?.name}</h3>
            </ListGroup.Item>
            <ListGroup.Item>
              <Rating
                value={product?.rating || 0}
                text={`${product?.numReviews} reviews`}
              />
            </ListGroup.Item>
            <ListGroup.Item>Price: {product?.price}</ListGroup.Item>
            <ListGroup.Item>Dription: {product?.description}</ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md='3'>
          <Card>
            <ListGroup>
              <ListGroup.Item>
                <Row>
                  <Col>Price:</Col>
                  <Col>
                    <strong>{product?.price}</strong>
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Status:</Col>
                  <Col>
                    {(product?.countInStock || 0) > 0
                      ? 'In Stock'
                      : 'Out Of Stock'}
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <div className='d-grid gap-2'>
                  <Button
                    className='btn-block'
                    type='button'
                    disabled={(product?.countInStock || 0) === 0}
                  >
                    Add To Cart
                  </Button>
                </div>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </MasterPage>
  );
};

export default ProductScreen;
