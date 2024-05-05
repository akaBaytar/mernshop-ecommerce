import { Fragment } from 'react';
import { Row, Col } from 'react-bootstrap';

import { useGetAllProductsQuery } from '../slices/productsApiSlice';

import Product from '../components/Product';
import Loader from '../components/Loader';
import Message from '../components/Message';

const Home = () => {
  const { data: products, isLoading, error } = useGetAllProductsQuery();

  return (
    <Fragment>
      <h2>Latest Products</h2>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>
          {error?.data?.message || error?.error}
        </Message>
      ) : (
        <Fragment>
          <Row>
            {products.map((product) => (
              <Col sm={12} md={6} lg={4} key={product._id}>
                <Product product={product} />
              </Col>
            ))}
          </Row>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Home;
