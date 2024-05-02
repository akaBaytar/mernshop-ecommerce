import { Fragment } from 'react';
import { Row, Col } from 'react-bootstrap';

import { useGetAllProductsQuery } from '../slices/productsApiSlice';

import Product from '../components/Product';

const Home = () => {
  const { data: products, isLoading, error } = useGetAllProductsQuery();

  return (
    <Fragment>
      {isLoading ? (
        <h2>loading...</h2>
      ) : error ? (
        <div>{error?.data?.message || error?.error}</div>
      ) : (
        <Fragment>
          <h2>Latest Products</h2>
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
