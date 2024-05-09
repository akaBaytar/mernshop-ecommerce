import { Fragment, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  Row,
  Col,
  Image,
  ListGroup,
  Button,
  Badge,
  Form,
} from 'react-bootstrap';

import { useGetProductDetailsQuery } from '../../slices/productsApiSlice';
import { addToCart } from '../../slices/cartSlice';

import Rating from '../../components/Rating';
import Loader from '../../components/Loader';
import Message from '../../components/Message';

const Product = () => {
  const { id } = useParams();

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const { data: product, isLoading, error } = useGetProductDetailsQuery(id);

  const [qty, setQty] = useState(1);

  const addToCartHandler = () => {
    dispatch(addToCart({ ...product, qty }));
    navigate('/cart');
  };

  return (
    <Fragment>
      <Link to={'/'} className='btn btn-light my-3'>
        Go Back
      </Link>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>
          {error?.data?.message || error?.error}
        </Message>
      ) : (
        <Row>
          <Col lg={6}>
            <div className='product-image-container'>
              <Image
                src={product.image}
                alt={product.name}
                className='rounded-3 img-fluid'
              />
            </div>
          </Col>
          <Col lg={6} className='product-meta-data'>
            <ListGroup variant='flush' className='rounded-3 mt-3 mt-lg-0'>
              <ListGroup.Item>
                <h3>{product.name}</h3>
                <Badge className='bg-dark'>{product.brand}</Badge>
              </ListGroup.Item>
              <ListGroup.Item>
                <span>{product.category}</span>
              </ListGroup.Item>
              <ListGroup.Item>
                <Rating
                  value={product.rating}
                  text={`${product.numReviews} reviews`}
                />
              </ListGroup.Item>
              <ListGroup.Item>
                <p>{product.description}.</p>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>
                    Price:<strong className='ms-2'>${product.price}</strong>
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>
                    Status:
                    <strong className='ms-2'>
                      {product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}
                    </strong>
                  </Col>
                </Row>
              </ListGroup.Item>
              {product.countInStock > 0 && (
                <ListGroup.Item>
                  <Row>
                    <Col className='d-flex align-items-center gap-2'>
                      Quantity:{' '}
                      <Form.Control
                        as='select'
                        value={qty}
                        className='text-center'
                        onChange={(e) => setQty(+e.target.value)}>
                        {[...Array(product.countInStock).keys()].map((x) => (
                          <option value={x + 1} key={x + 1}>
                            {x + 1}
                          </option>
                        ))}
                      </Form.Control>
                    </Col>
                  </Row>
                </ListGroup.Item>
              )}
              <ListGroup.Item>
                <div className='d-grid'>
                  <Button
                    className='btn btn-block btn-dark'
                    type='button'
                    disabled={product.countInStock === 0}
                    onClick={addToCartHandler}>
                    Add to Cart
                  </Button>
                </div>
              </ListGroup.Item>
            </ListGroup>
          </Col>
        </Row>
      )}
    </Fragment>
  );
};

export default Product;
