import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Card } from 'react-bootstrap';

import Rating from './Rating';

const Product = ({ product }) => {
  return (
    <Card className='card my-3 p-3 rounded-3'>
      <Link to={`/products/${product._id}`}>
        <Card.Img src={product.image} variant='top' className='rounded-3' />
      </Link>
      <Card.Body>
        <Link to={`/products/${product._id}`}>
          <Card.Title as={'p'}>
            <strong>{product.name}</strong>
          </Card.Title>
        </Link>
        <Card.Text as='div'>
          <Rating
            value={product.rating}
            text={
              product.numReviews > 1
                ? `${product.numReviews} reviews`
                : `${product.numReviews} review`
            }
          />
        </Card.Text>
        <Card.Text as='h3' className='fw-bold mt-2'>
          ${product.price}
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

Product.propTypes = {
  product: PropTypes.object,
};

export default Product;
