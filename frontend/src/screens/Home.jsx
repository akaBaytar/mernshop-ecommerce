import axios from 'axios';

import { Fragment, useEffect, useState } from 'react';
import { Row, Col } from 'react-bootstrap';

import Product from '../components/Product';

const Home = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      const { data } = await axios.get('/api/v1/products');

      setProducts(data);
    };

    getProducts();
  }, []);

  return (
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
  );
};

export default Home;
