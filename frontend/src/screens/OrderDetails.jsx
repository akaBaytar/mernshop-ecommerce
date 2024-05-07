import { Fragment } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Row, Col, ListGroup, Image, Card } from 'react-bootstrap';

import Message from '../components/Message';
import Loader from '../components/Loader';

import { useGetOrderDetailsQuery } from '../slices/ordersApiSlice';

const OrderDetails = () => {
  const { id } = useParams();

  const { data: order, isLoading, error } = useGetOrderDetailsQuery(id);

  console.log(order);

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
                    Delivered on {order.deliveredAt}.
                  </Message>
                ) : (
                  <Message variant='danger'>Not delivered.</Message>
                )}
              </ListGroup.Item>
              <ListGroup.Item>
                <h2>Payment</h2>
                <p>
                  <strong>Method: </strong>
                  {order.paymentMethod}
                </p>
                {order.isPaid ? (
                  <Message variant='success'>Paid on {order.paidAt}.</Message>
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
          <Card>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <h2>Order Summary</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Items</Col>
                  <Col>
                    ${order.totalPrice - (order.shippingPrice + order.taxPrice)}
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
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </Fragment>
  );
};

export default OrderDetails;
