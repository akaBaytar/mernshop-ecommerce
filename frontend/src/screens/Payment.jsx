import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

import { savePaymentMethod } from '../slices/cartSlice';

import CheckoutProgress from '../layout/CheckoutProgress';
import FormContainer from '../components/FormContainer';

const Payment = () => {
  const [paymentMethod, setPaymentMethod] = useState('PayPal');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { shippingAddress } = useSelector((state) => state.cart);

  useEffect(() => {
    if (!shippingAddress) {
      navigate('/shipping');
    }
  }, [shippingAddress, navigate]);

  const submitHandler = (e) => {
    e.preventDefault;
    dispatch(savePaymentMethod(paymentMethod));
    navigate('/place-order');
  };

  return (
    <FormContainer>
      <CheckoutProgress step1 step2 step3 />
      <h1>Payment Method</h1>
      <hr />
      <Form onSubmit={submitHandler}>
        <Form.Group className='payment-method-container'>
          <Form.Label as='legend'>Select Method</Form.Label>
          <Col>
            <Form.Check
              type='radio'
              className='my-2'
              label='PayPal'
              id='PayPal'
              name='paymentMethod'
              value='Paypal'
              checked
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
          </Col>
          <Col>
            <Form.Check
              type='radio'
              className='my-2'
              label='Credit Card'
              id='CreditCard'
              name='paymentMethod'
              value='Credit Card'
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
          </Col>
        </Form.Group>
        <div className='d-grid'>
          <Button type='submit' variant='dark'>
            Confirm
          </Button>
        </div>
      </Form>
    </FormContainer>
  );
};

export default Payment;
