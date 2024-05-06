import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Form, Button, Row, Col, Spinner } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import FormContainer from '../components/FormContainer';

import { useLoginMutation } from '../slices/usersApiSlice';
import { setCredentials } from '../slices/authSlice';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [login, { isLoading }] = useLoginMutation();

  const { userInfo } = useSelector((state) => state.auth);

  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const redirect = params.get('redirect') || '/';

  useEffect(() => {
    if (userInfo) navigate(redirect);
  }, [userInfo, redirect, navigate]);

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const res = await login({ email, password }).unwrap();
      dispatch(setCredentials({ ...res }));
      navigate(redirect);
    } catch (error) {
      toast.error(error?.data?.message || error?.error);
    }
  };

  return (
    <FormContainer>
      <h1>Sign In</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group controlId='email' className='my-3'>
          <Form.Label>Email:</Form.Label>
          <Form.Control
            type='email'
            placeholder='Email address'
            autoComplete='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId='password' className='my-3'>
          <Form.Label>Password:</Form.Label>
          <Form.Control
            type='password'
            value={password}
            autoComplete='none'
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>

        <div className='d-grid'>
          <Button
            type='submit'
            variant='dark'
            className='mt-3 py-2'
            disabled={isLoading}>
            {isLoading ? (
              <Spinner style={{ height: '1rem', width: '1rem' }} />
            ) : (
              'Sign In'
            )}
          </Button>
        </div>
      </Form>
      <Row className='py-3'>
        <Col>
          <small>
            New customer?{' '}
            <Link
              to={redirect ? `/register?redirect=${redirect}` : '/register'}>
              Register here.
            </Link>
          </small>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default Login;
