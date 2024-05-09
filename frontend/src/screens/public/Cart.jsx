import { Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import {
  Row,
  Col,
  ListGroup,
  Image,
  Button,
  Card,
  FormControl,
} from 'react-bootstrap';

import { addToCart, removeFromCart } from '../../slices/cartSlice';

import { FaTrash } from 'react-icons/fa';

import Message from '../../components/Message';

const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const itemsInCart = cartItems.reduce((acc, item) => acc + item.qty, 0);

  const subtotal = cartItems
    .reduce((acc, item) => acc + item.qty * item.price, 0)
    .toFixed(2);

  const shippingFee = cart.shippingPrice;
  const tax = cart.taxPrice;
  const total = cart.totalPrice;

  const addToCartHandler = async (product, qty) => {
    dispatch(addToCart({ ...product, qty }));
  };

  const removeFromCartHandler = async (id) => {
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = () => {
    navigate('/login?redirect=/shipping');
  };

  return (
    <Fragment>
      <h1 style={{ marginBlockEnd: '1.25rem' }}>Shopping Cart</h1>
      <Row className='cart-meta-data'>
        <Col md={8}>
          {cartItems.length === 0 ? (
            <Message variant='secondary'>Your cart is empty.</Message>
          ) : (
            <ListGroup variant='flush'>
              {cartItems.map((item) => (
                <ListGroup.Item key={item._id}>
                  <Row>
                    <Col md={2}>
                      <Image src={item.image} alt={item.name} fluid />
                    </Col>
                    <Col md={3}>
                      <Link to={`/product/${item._id}`}>
                        <p className='item-name'>{item.name}</p>
                      </Link>
                    </Col>
                    <Col md={2}>
                      <strong>${item.price}</strong>
                    </Col>
                    <Col md={2}>
                      <FormControl
                        as='select'
                        value={item.qty}
                        onChange={(e) =>
                          addToCartHandler(item, +e.target.value)
                        }>
                        {[...Array(item.countInStock).keys()].map((x) => (
                          <option key={x + 1} value={x + 1}>
                            {x + 1}
                          </option>
                        ))}
                      </FormControl>
                    </Col>
                    <Col md={1}>
                      <div className='d-grid'>
                        <Button
                          type='button'
                          variant='danger'
                          className='delete-btn'
                          onClick={() => removeFromCartHandler(item._id)}>
                          <FaTrash />
                        </Button>
                      </div>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </Col>
        <Col md={4}>
          {cartItems.length !== 0 && (
            <Card>
              <ListGroup variant='flush'>
                <ListGroup.Item>
                  <h2>
                    Total for {itemsInCart}{' '}
                    {+itemsInCart > 1 ? 'items' : 'item'}
                  </h2>
                </ListGroup.Item>
                <ListGroup.Item>
                  <p>Subtotal:</p>
                  <strong>${subtotal}</strong>
                </ListGroup.Item>
                <ListGroup.Item>
                  <p>Tax:</p>
                  <strong>${tax}</strong>
                </ListGroup.Item>
                <ListGroup.Item>
                  <p>Shipping Fee:</p>
                  <strong>${shippingFee}</strong>
                </ListGroup.Item>
                <ListGroup.Item>
                  <p>Total:</p>
                  <strong>${total}</strong>
                </ListGroup.Item>
                <ListGroup.Item>
                  <div className='d-grid'>
                    <Button
                      type='button'
                      className='btn-dark'
                      disabled={cartItems.length === 0}
                      onClick={checkoutHandler}>
                      Proceed to Checkout
                    </Button>
                  </div>
                </ListGroup.Item>
              </ListGroup>
            </Card>
          )}
        </Col>
      </Row>
    </Fragment>
  );
};

export default Cart;
