import { useEffect, useState, Fragment } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import { toast } from 'react-toastify';

import FormContainer from '../../components/FormContainer';
import Message from '../../components/Message';
import Loader from '../../components/Loader';

import {
  useGetUserDetailsQuery,
  useUpdateUserMutation,
} from '../../slices/usersApiSlice';

const UserEdit = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);

  const { id } = useParams();

  const { data: user, isLoading, error, refetch } = useGetUserDetailsQuery(id);

  const [updateUser, { isLoading: isUpdating }] = useUpdateUserMutation();

  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setIsAdmin(user.isAdmin);
    }
  }, [user]);

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      await updateUser({ id, name, email, isAdmin });
      toast.success('User updated successfully.');
      refetch()
      navigate('/admin/users')
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
  };

  return (
    <Fragment>
      <div className='d-flex justify-content-between align-items-center'>
        <h1 className='my-2'>User Profile</h1>
        <Link to='/admin/users' className='btn btn-dark btn-sm my-2'>
          Go Back
        </Link>
      </div>
      <hr />
      <FormContainer>
        {isUpdating && <Loader />}
        {isLoading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>{error}</Message>
        ) : (
          <Form
            className='border border-black p-4 rounded'
            onSubmit={submitHandler}>
            <Form.Group controlId='name'>
              <Form.Label>Name:</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter name'
                value={name}
                autoComplete='none'
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId='email' className='mt-2'>
              <Form.Label>Email:</Form.Label>
              <Form.Control
                type='email'
                placeholder='Enter email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId='isAdmin' className='mt-2'>
              <Form.Label>Admin:</Form.Label>
              <Form.Check
                type='checkbox'
                label={
                  isAdmin.toString().charAt(0).toUpperCase() +
                  isAdmin.toString().substring(1)
                }
                checked={isAdmin}
                onChange={(e) => setIsAdmin(e.target.checked)}
              />
            </Form.Group>
            <div className='d-grid'>
              <Button type='submit' variant='dark' className='mt-4'>
                Update User
              </Button>
            </div>
          </Form>
        )}
      </FormContainer>
    </Fragment>
  );
};

export default UserEdit;
