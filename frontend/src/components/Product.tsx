import React from 'react';
import { Card } from 'react-bootstrap';
import { Product } from '../products';
import Rating from './Rating';
interface Props {
  product: Product;
}
const ProductComp: React.FC<Props> = ({
  product: { image, name, _id, rating, numReviews, price },
}) => {
  return (
    <Card className='rounded my-3 p-3'>
      <a href={`/product/${_id}`}>
        <Card.Img variant='top' src={image} />
      </a>
      <Card.Body>
        <a href={`/product/${_id}`}>
          <Card.Title as='div'>
            <strong>{name}</strong>
          </Card.Title>
        </a>
        <Card.Text as='div'>
          <Rating value={rating} text={`${numReviews} reviews`} />
        </Card.Text>
        <Card.Text as='h3'>{price}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default ProductComp;
