import { Fragment } from 'react';
import { Row, Col } from 'react-bootstrap';

import Product from '../components/Product';

import PRODUCTS from '../../mock/products';

const Home = () => {
  return (
    <Fragment>
      <h2>Latest Products</h2>
      <Row>
        {PRODUCTS.map((product) => (
          <Col sm={12} md={6} lg={4} key={product._id}>
            <Product product={product} />
          </Col>
        ))}
      </Row>
    </Fragment>
  );
};

export default Home;
