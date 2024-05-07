import { Fragment, useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button, Table, Form, Row, Col, Spinner } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';

import { toast } from 'react-toastify';

import { logout, setCredentials } from '../slices/authSlice';
import { clearCartItems } from '../slices/cartSlice';

import { useLogoutMutation, useProfileMutation } from '../slices/usersApiSlice';

const Profile = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { userInfo } = useSelector((state) => state.auth);

  const [logoutApiCall] = useLogoutMutation();

  const [updateProfile, { isLoading }] = useProfileMutation();

  useEffect(() => {
    if (userInfo) {
      setName(userInfo.name);
      setEmail(userInfo.email);
    }
  }, [userInfo]);

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      dispatch(clearCartItems());
      navigate('/');
    } catch (error) {
      console.error(error);
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error('Password do not match.');
    } else {
      try {
        const res = await updateProfile({
          _id: userInfo._id,
          name,
          email,
          password,
        }).unwrap();

        dispatch(setCredentials(res));

        toast.success('Profile updated successfully.');
      } catch (error) {
        toast.error(error?.data?.message || error?.error);
      }
    }
  };

  return (
    <Fragment>
      <div className='d-flex align-items-center justify-content-between'>
        <h1 className='m-0'>User Profile</h1>
        <Button
          type='button'
          variant='danger'
          className='btn-sm'
          onClick={logoutHandler}>
          Logout
        </Button>
      </div>
      <hr />
      <Row>
        <Col md={4}>
          <Form onSubmit={submitHandler}>
            <Form.Group controlId='name' className='my-2'>
              <Form.Label>Name:</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter your name'
                value={name}
                autoComplete='name'
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId='email' className='my-2'>
              <Form.Label>Email:</Form.Label>
              <Form.Control
                type='email'
                placeholder='Enter your email address'
                value={email}
                autoComplete='email'
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId='password' className='my-2'>
              <Form.Label>New Password:</Form.Label>
              <Form.Control
                type='password'
                placeholder='Enter your password'
                value={password}
                autoComplete='none'
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId='confirmPassword' className='my-2'>
              <Form.Label>Confirm New Password:</Form.Label>
              <Form.Control
                type='password'
                placeholder='Confirm New Password'
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
                onClick={submitHandler}>
                {isLoading ? (
                  <Spinner style={{ height: '1rem', width: '1rem' }} />
                ) : (
                  'Update Profile'
                )}
              </Button>
            </div>
          </Form>
        </Col>
        <Col md={8}></Col>
      </Row>
    </Fragment>
  );
};

export default Profile;
