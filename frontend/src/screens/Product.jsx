import { Fragment } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Row, Col, Image, ListGroup, Button, Badge } from 'react-bootstrap';

import { useGetProductDetailsQuery } from '../slices/productsApiSlice';

import Rating from '../components/Rating';

const Product = () => {
  const { id } = useParams();

  const { data: product, isLoading, error } = useGetProductDetailsQuery(id);

  return (
    <Fragment>
      <Link to={'/'} className='btn btn-light my-3'>
        Go Back
      </Link>
      {isLoading ? (
        <h2>loading...</h2>
      ) : error ? (
        <div>{error?.data?.message || error?.error}</div>
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
              <ListGroup.Item>
                <div className='d-grid'>
                  <Button
                    className='btn btn-block btn-dark'
                    type='button'
                    disabled={product.countInStock === 0}>
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
