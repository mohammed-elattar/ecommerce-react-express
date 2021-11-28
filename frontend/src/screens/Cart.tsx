import React, { useEffect } from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch, RootStateOrAny } from 'react-redux';
import {
  addToCart,
  CartItem,
  removeFromCart,
} from '../store/features/cart-api-slice';
import {
  Row,
  Col,
  ListGroup,
  Image,
  Form,
  Button,
  Card,
} from 'react-bootstrap';
import Message from '../components/Message';
import MasterPage from '../components/MasterPage';

const CartScreen: React.FC = () => {
  const dispatch = useDispatch();
  const { id: productId } = useParams();
  const location = useLocation();
  const qty = location.search ? Number(location.search.split('=')[1]) : 1;
  const navigate = useNavigate();

  const state = useSelector((state: RootStateOrAny) => {
    return state.cart;
  });

  const { cartItems } = state;
  useEffect(() => {
    if (productId) {
      dispatch(addToCart({ productId, qty }));
    }
  }, [dispatch, productId, qty]);

  const removeFromCartHandler = (id: string) => {
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = () => {
    navigate('/login?redirect=shipping');
  };

  return (
    <MasterPage>
      <Row>
        <Col md={8}>
          <h1>Shopping Cart</h1>
          {cartItems.length === 0 ? (
            <Message variant='success'>
              Your cart is empty <Link to='/'>Go Back</Link>
            </Message>
          ) : (
            <ListGroup variant='flush'>
              {cartItems.map((item: CartItem) => (
                <ListGroup.Item key={item.product}>
                  <Row>
                    <Col md={2}>
                      <Image src={item.image} alt={item.name} fluid rounded />
                    </Col>
                    <Col md={3}>
                      <Link to={`/product/${item.product}`}>{item.name}</Link>
                    </Col>
                    <Col md={2}>${item.price}</Col>
                    <Col md={2}>
                      <Form.Control
                        as='select'
                        value={item.qty}
                        onChange={(e) =>
                          dispatch(
                            addToCart({
                              productId: item.product,
                              qty: Number(e.target.value),
                            })
                          )
                        }
                      >
                        {[...Array(item.countInStock).keys()].map((x) => (
                          <option key={x + 1} value={x + 1}>
                            {x + 1}
                          </option>
                        ))}
                      </Form.Control>
                    </Col>
                    <Col md={2}>
                      <Button
                        type='button'
                        variant='light'
                        onClick={() => removeFromCartHandler(item.product)}
                      >
                        <i className='fas fa-trash'></i>
                        Delete
                      </Button>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <h2>
                  Subtotal (
                  {cartItems.reduce(
                    (acc: number, item: CartItem) => acc + item.qty,
                    0
                  )}
                  ) items
                </h2>
                $
                {cartItems
                  .reduce(
                    (acc: number, item: CartItem) =>
                      acc + item.qty * parseFloat(item.price),
                    0
                  )
                  .toFixed(2)}
              </ListGroup.Item>
              <ListGroup.Item>
                <Button
                  type='button'
                  className='btn-block'
                  disabled={cartItems.length === 0}
                  onClick={checkoutHandler}
                >
                  Proceed To Checkout
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </MasterPage>
  );
};

export default CartScreen;
