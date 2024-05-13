import { Link } from 'react-router-dom';
import { Carousel, Image } from 'react-bootstrap';

import Loader from '../components/Loader';
import Message from '../components/Message';

import { useGetTopProductsQuery } from '../slices/productsApiSlice';

const CarouselComponent = () => {
  const { data: products, isLoading, error } = useGetTopProductsQuery();

  return isLoading ? (
    <Loader />
  ) : error ? (
    <Message variant='danger'>{error}</Message>
  ) : (
    <Carousel pause='hover' className='carousel-container my-4 rounded'>
      {products.map(({ _id, image, name, price }) => (
        <Carousel.Item key={_id}>
          <Link to={`/products/${_id}`}>
            <Image src={image} alt={name} fluid className='rounded' />
            <Carousel.Caption className='caption'>
              <h6>
                {name} - ${price}
              </h6>
            </Carousel.Caption>
          </Link>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default CarouselComponent;
