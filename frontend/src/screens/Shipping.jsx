import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

import FormContainer from '../components/FormContainer';
import CheckoutProgress from '../layout/CheckoutProgress';

import { saveShippingAddress } from '../slices/cartSlice';

const Shipping = () => {
  const { shippingAddress } = useSelector((state) => state.cart);

  const [address, setAddress] = useState(shippingAddress?.address || '');
  const [city, setCity] = useState(shippingAddress?.city || '');
  const [postal, setPostal] = useState(shippingAddress?.postal || '');
  const [country, setCountry] = useState(shippingAddress?.country || '');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(saveShippingAddress({ address, city, postal, country }));
    navigate('/payment');
  };

  return (
    <FormContainer>
      <CheckoutProgress step1 step2 />
      <h1>Shipping</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group controlId='address' className='my-3'>
          <Form.Label>Address</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter your address'
            value={address}
            autoComplete='street-address'
            onChange={(e) => setAddress(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId='city' className='my-3'>
          <Form.Label>City</Form.Label>
          <Form.Control
            type='text'
            placeholder='City'
            value={city}
            autoComplete='address-level1'
            onChange={(e) => setCity(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId='postal' className='my-3'>
          <Form.Label>Postal Code:</Form.Label>
          <Form.Control
            type='text'
            placeholder='Postal Code'
            value={postal}
            autoComplete='postal-code'
            onChange={(e) => setPostal(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId='country' className='my-3'>
          <Form.Label>Country</Form.Label>
          <Form.Control
            type='text'
            placeholder='Country'
            value={country}
            autoComplete='country-name'
            onChange={(e) => setCountry(e.target.value)}
          />
        </Form.Group>
        <div className='d-grid'>
          <Button type='submit' variant='dark' className='mt-3 py-2'>
            Proceed to Payment
          </Button>
        </div>
      </Form>
    </FormContainer>
  );
};

export default Shipping;
