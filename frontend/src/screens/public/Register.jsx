import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Form, Button, Row, Col, Spinner } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import FormContainer from '../../components/FormContainer';

import { useRegisterMutation } from '../../slices/usersApiSlice';
import { setCredentials } from '../../slices/authSlice';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [register, { isLoading }] = useRegisterMutation();

  const { userInfo } = useSelector((state) => state.auth);

  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const redirect = params.get('redirect') || '/';

  useEffect(() => {
    if (userInfo) navigate(redirect);
  }, [userInfo, redirect, navigate]);

  const submitHandler = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error('Passwords do not match.');
    } else {
      try {
        const res = await register({ name, email, password }).unwrap();
        dispatch(setCredentials({ ...res }));
        navigate(redirect);
      } catch (error) {
        toast.error(error?.data?.message || error?.error);
      }
    }
  };

  return (
    <FormContainer>
      <h1>Register</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group controlId='name' className='my-3'>
          <Form.Label>Name:</Form.Label>
          <Form.Control
            type='text'
            placeholder='Name'
            autoComplete='name'
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Group>
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
        <Form.Group controlId='confirmPassword' className='my-3'>
          <Form.Label>Confirm Password:</Form.Label>
          <Form.Control
            type='password'
            value={confirmPassword}
            autoComplete='none'
            onChange={(e) => setConfirmPassword(e.target.value)}
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
              'Sign Up'
            )}
          </Button>
        </div>
      </Form>
      <Row className='py-3'>
        <Col>
          <small>
            Already have an account?{' '}
            <Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>
              Login here.
            </Link>
          </small>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default Register;
