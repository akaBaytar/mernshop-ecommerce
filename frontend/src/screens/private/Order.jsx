import { Fragment, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  Button,
  Row,
  Col,
  ListGroup,
  Image,
  Card,
  ListGroupItem,
  Spinner,
} from 'react-bootstrap';

import { toast } from 'react-toastify';

import CheckoutProgress from '../../layout/CheckoutProgress';
import Message from '../../components/Message';

import { useCreateOrderMutation } from '../../slices/ordersApiSlice';
import { clearCartItems } from '../../slices/cartSlice';

const Order = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [createOrder, { isLoading, error }] = useCreateOrderMutation();

  const cart = useSelector((state) => state.cart);

  const {
    shippingAddress,
    paymentMethod,
    cartItems,
    itemsPrice,
    shippingPrice,
    taxPrice,
    totalPrice,
  } = cart;

  const { address, city, postal, country } = shippingAddress;

  useEffect(() => {
    if (!shippingAddress.address) {
      navigate('/shipping');
      toast.warn('Enter valid shipping address.');
    } else if (!paymentMethod) {
      navigate('/payment');
      toast.warn('Select valid payment method.');
    }
  }, [paymentMethod, shippingAddress.address, navigate]);

  const placeOrderHandler = async () => {
    try {
      const res = await createOrder({
        orderItems: cartItems,
        shippingAddress,
        paymentMethod,
        shippingPrice,
        taxPrice,
        totalPrice,
      }).unwrap();

      dispatch(clearCartItems());
      navigate(`/orders/${res._id}`);
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <Fragment>
      <CheckoutProgress step1 step2 step3 step4 />
      <h1>Place Order</h1>
      <hr />
      <Row>
        <Col md={8}>
          <ListGroup variant='flush' className='order-meta-data'>
            <ListGroup.Item className='rounded-top-2'>
              <h3>Shipping</h3>
              <strong>Address:</strong> {address}, {city}, {postal}, {country}
            </ListGroup.Item>
            <ListGroup.Item>
              <h3>Payment</h3>
              <strong>Method:</strong> {paymentMethod}
            </ListGroup.Item>
            <ListGroup.Item className='rounded-bottom-3'>
              <h3>Order Items</h3>
              {cartItems.length === 0 ? (
                <Message variant='secondary'>Your cart is empty.</Message>
              ) : (
                <ListGroup variant='flush' className='rounded-bottom-3'>
                  {cartItems.map(
                    ({ image, name, product, qty, price }, index) => (
                      <ListGroup.Item key={index} className='rounded-top-3'>
                        <Row>
                          <Col md={2}>
                            <Image src={image} alt={name} fluid rounded />
                          </Col>
                          <Col md={5}>
                            <Link to={`/products/${product}`}>{name}</Link>
                          </Col>
                          <Col md={5}>
                            {qty} x ${price} = ${qty * price}
                          </Col>
                        </Row>
                      </ListGroup.Item>
                    )
                  )}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card className='place-order-card'>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <h3>Order Summary</h3>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Items:</Col>
                  <Col>${itemsPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Shipping:</Col>
                  <Col>${shippingPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Tax:</Col>
                  <Col>${taxPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Total:</Col>
                  <Col>${totalPrice}</Col>
                </Row>
              </ListGroup.Item>
              {error && (
                <ListGroupItem>
                  <Message variant='danger'>
                    {error?.data?.message || error.error}
                  </Message>
                </ListGroupItem>
              )}
              <ListGroup.Item>
                <div className='d-grid'>
                  <Button
                    type='submit'
                    variant='dark'
                    className='mt-3 py-2'
                    disabled={cartItems.length === 0}
                    onClick={placeOrderHandler}>
                    {isLoading ? (
                      <Spinner style={{ height: '1rem', width: '1rem' }} />
                    ) : (
                      'Place Order'
                    )}
                  </Button>
                </div>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </Fragment>
  );
};

export default Order;
