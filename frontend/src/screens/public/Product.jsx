import { Fragment, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
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

import { toast } from 'react-toastify';

import {
  useGetProductDetailsQuery,
  useCreateReviewMutation,
} from '../../slices/productsApiSlice';

import { addToCart } from '../../slices/cartSlice';

import Rating from '../../components/Rating';
import Loader from '../../components/Loader';
import Message from '../../components/Message';

const Product = () => {
  const { id } = useParams();

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const { userInfo } = useSelector((state) => state.auth);

  const {
    data: product,
    isLoading,
    error,
    refetch,
  } = useGetProductDetailsQuery(id);

  const [createReview, { isLoading: isReviewing }] = useCreateReviewMutation();

  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  const addToCartHandler = () => {
    dispatch(addToCart({ ...product, qty }));
    navigate('/cart');
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      await createReview({ id, rating, comment }).unwrap();
      refetch();

      toast.success('Review submitted successfully.');

      setRating(0);
      setComment('');
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
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
        <Fragment>
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
          <Row className='mt-4'>
            <Col md={6}>
              <div className='border border-1 border-opacity-25 border-dark rounded p-2 mb-4'>
                <h3>Reviews</h3>
                {product.reviews.length === 0 && (
                  <Message variant='secondary'>No reviews.</Message>
                )}
                <ListGroup variant='flush' className='mt-2'>
                  {product.reviews.map(
                    ({ _id, name, rating, createdAt, comment }) => (
                      <ListGroup.Item key={_id} className='rounded review'>
                        <strong>{name}</strong>
                        <Rating value={rating} />
                        <p>{createdAt.substring(0, 10)}</p>
                        <p>{comment}</p>
                      </ListGroup.Item>
                    )
                  )}
                </ListGroup>
              </div>
            </Col>
            <Col md={6}>
              <div className='border border-1 border-opacity-25 border-dark rounded p-2'>
                <h3>Write a Customer Review</h3>
                {isReviewing && <Loader />}
                {userInfo ? (
                  <Form onSubmit={submitHandler}>
                    <Form.Group controlId='rating'>
                      <Form.Label>Rating</Form.Label>
                      <Form.Control
                        as='select'
                        value={rating}
                        onChange={(e) => setRating(+e.target.value)}>
                        <option value=''>Select your rating</option>
                        <option value='5'>5 - Excellent</option>
                        <option value='4'>4 - Very Good</option>
                        <option value='3'>3 - Good</option>
                        <option value='2'>2 - Fair</option>
                        <option value='1'>1 - Poor</option>
                      </Form.Control>
                    </Form.Group>
                    <Form.Group controlId='comment' className='mt-2'>
                      <Form.Label>Comment</Form.Label>
                      <Form.Control
                        as='textarea'
                        value={comment}
                        rows={6}
                        placeholder='Enter your review'
                        onChange={(e) => setComment(e.target.value)}
                      />
                    </Form.Group>
                    <div className='d-grid'>
                      <Button
                        className='mt-2'
                        variant='dark'
                        type='submit'
                        disabled={isReviewing}>
                        Submit
                      </Button>
                    </div>
                  </Form>
                ) : (
                  <Message variant='secondary'>
                    Please log in to leave a review.
                  </Message>
                )}
              </div>
            </Col>
          </Row>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Product;
