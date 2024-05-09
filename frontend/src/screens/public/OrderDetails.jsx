import { Fragment } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
  Row,
  Col,
  ListGroup,
  Image,
  Card,
  Button,
  Spinner,
} from 'react-bootstrap';

import { toast } from 'react-toastify';

import Message from '../../components/Message';
import Loader from '../../components/Loader';

import {
  useGetOrderDetailsQuery,
  useDeliverOrderMutation,
} from '../../slices/ordersApiSlice';

const OrderDetails = () => {
  const { id } = useParams();

  const { userInfo } = useSelector((state) => state.auth);

  const {
    data: order,
    isLoading,
    error,
    refetch,
  } = useGetOrderDetailsQuery(id);

  const [deliverOrder, { isLoading: isLodingDeliver }] =
    useDeliverOrderMutation();

  const clickHandler = async () => {
    try {
      await deliverOrder(id);
      refetch();
      toast.success('Order delivered.');
    } catch (error) {
      toast.error(error?.data?.message || error.message);
    }
  };

  return isLoading ? (
    <Fragment>
      <h1>Order Details</h1>
      <hr />
      <Loader />
    </Fragment>
  ) : error ? (
    <Fragment>
      <h1>Order Details</h1>
      <hr />
      <Message variant='danger'>{error}</Message>
    </Fragment>
  ) : (
    <Fragment>
      <h1>Order Details</h1>
      <span>{`Order - ${id}`}</span>
      <hr />
      <Row>
        <Col md={8}>
          <Card>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <h2>Shipping</h2>
                <p>
                  <strong>Name: </strong>
                  {order.user.name}
                </p>
                <p>
                  <strong>Email: </strong>
                  {order.user.email}
                </p>
                <p>
                  <strong>Address: </strong>
                  {order.shippingAddress.address}, {order.shippingAddress.city},{' '}
                  {order.shippingAddress.postal},{' '}
                  {order.shippingAddress.country}
                </p>
                {order.isDelivered ? (
                  <Message variant='success'>
                    Delivered on {order.deliveredAt?.substring(0, 10)}.
                  </Message>
                ) : (
                  <Message variant='danger'>Not delivered.</Message>
                )}
              </ListGroup.Item>
              <ListGroup.Item>
                <h2>Payment</h2>
                {order.isPaid ? (
                  <Message variant='success'>{`Paid succesfully via ${order.paymentMethod}.`}</Message>
                ) : (
                  <Message variant='danger'>Not paid.</Message>
                )}
              </ListGroup.Item>
              <ListGroup.Item>
                <h2>Order Items</h2>
                {order.orderItems.map((item, index) => (
                  <ListGroup.Item key={index}>
                    <Row>
                      <Col md={2}>
                        <Image src={item.image} alt={item.name} fluid rounded />
                      </Col>
                      <Col>
                        <Link to={`/product/${item.product}`}>{item.name}</Link>
                      </Col>
                      <Col md={4}>
                        {item.qty} x ${item.price}
                      </Col>
                    </Row>
                  </ListGroup.Item>
                ))}
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
        <Col md={4}>
          <Card className='mt-4 mt-md-0'>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <h2>Order Summary</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Items</Col>
                  <Col>
                    $
                    {(
                      order.totalPrice -
                      (order.shippingPrice + order.taxPrice)
                    ).toFixed(2)}
                  </Col>
                </Row>
                <Row>
                  <Col>Shipping</Col>
                  <Col>${order.shippingPrice}</Col>
                </Row>
                <Row>
                  <Col>Tax</Col>
                  <Col>${order.taxPrice}</Col>
                </Row>
                <Row>
                  <Col>Total</Col>
                  <Col>${order.totalPrice}</Col>
                </Row>
              </ListGroup.Item>
              {userInfo && userInfo.isAdmin && (
                <ListGroup.Item>
                  <div className='d-grid'>
                    <Button
                      variant='dark'
                      className='py-2'
                      onClick={clickHandler}
                      disabled={order.isDelivered}>
                      {isLodingDeliver ? (
                        <Spinner style={{ height: '1rem', width: '1rem' }} />
                      ) : order.isDelivered ? (
                        'Delivered'
                      ) : (
                        'Mark as Delivered'
                      )}
                    </Button>
                  </div>
                </ListGroup.Item>
              )}
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </Fragment>
  );
};

export default OrderDetails;
