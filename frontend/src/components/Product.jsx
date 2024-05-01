import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { Card } from 'react-bootstrap';

import Rating from './Rating';

const Product = ({ product }) => {
  return (
    <Card className='card my-3 p-3 rounded'>
      <Link to={`/products/${product._id}`}>
        <Card.Img src={product.image} variant='top' />
      </Link>
      <Card.Body>
        <Link to={`/products/${product._id}`}>
          <Card.Title as={'p'}>
            <strong>{product.name}</strong>
          </Card.Title>
        </Link>
        <Card.Text as='div'>
          <Rating value={product.rating} text={`${product.numReviews} reviews`}/>
        </Card.Text>
        <Card.Text as='h3' className='fw-bold'>${product.price}</Card.Text>
      </Card.Body>
    </Card>
  );
};

Product.propTypes = {
  product: PropTypes.object,
};

export default Product;
