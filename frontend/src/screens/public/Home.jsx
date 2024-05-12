import { Fragment } from 'react';
import { Row, Col } from 'react-bootstrap';
import { useParams } from 'react-router-dom';

import { useGetAllProductsQuery } from '../../slices/productsApiSlice';

import Product from '../../components/Product';
import Loader from '../../components/Loader';
import Message from '../../components/Message';
import Pagination from '../../components/Pagination';

const Home = () => {
  const { pageNumber } = useParams();
  const { data, isLoading, error } = useGetAllProductsQuery({ pageNumber });

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
            {data.products.map((product) => (
              <Col sm={12} md={6} lg={4} key={product._id}>
                <Product product={product} />
              </Col>
            ))}
          </Row>
          <Pagination pages={data.pages} page={data.page} />
        </Fragment>
      )}
    </Fragment>
  );
};

export default Home;
