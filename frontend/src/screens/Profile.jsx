import { Fragment, useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button, Table, Form, Row, Col, Spinner } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';

import { toast } from 'react-toastify';

import Loader from '../components/Loader';
import Message from '../components/Message';

import { FaTimes } from 'react-icons/fa';

import { logout, setCredentials } from '../slices/authSlice';
import { clearCartItems } from '../slices/cartSlice';
import { useGetMyOrdersQuery } from '../slices/ordersApiSlice';
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

  const {
    data: orders,
    isLoading: isOrdersLoading,
    error,
  } = useGetMyOrdersQuery();

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
          <h5>{userInfo.name}</h5>
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
        <Col md={8} className='my-4 my-md-0'>
          <h5>Order History</h5>
          {isOrdersLoading ? (
            <Loader />
          ) : error ? (
            <Message variant='danger'>
              {error?.data?.message || error?.error}
            </Message>
          ) : (
            <Table className='table-sm' striped hover responsive>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>DATE</th>
                  <th>TOTAL</th>
                  <th>PAID</th>
                  <th>DELIVERED</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {orders.map(
                  ({
                    _id,
                    createdAt,
                    totalPrice,
                    isPaid,
                    paidAt,
                    isDelivered,
                    deliveredAt,
                  }) => (
                    <tr key={_id}>
                      <td>{_id}</td>
                      <td>{createdAt.substring(0, 10)}</td>
                      <td>${totalPrice}</td>
                      <td>
                        {isPaid ? (
                          paidAt.substring(0, 10)
                        ) : (
                          <FaTimes />
                        )}
                      </td>
                      <td>
                        {isDelivered ? (
                          deliveredAt.substring(0, 10)
                        ) : (
                          <FaTimes />
                        )}
                      </td>
                      <td>
                        <Link to={`/orders/${_id}`} className='order-details-btn'>
                          Details
                        </Link>
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </Table>
          )}
        </Col>
      </Row>
    </Fragment>
  );
};

export default Profile;
