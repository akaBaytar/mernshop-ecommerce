import { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Table } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { FaTimes, FaTrash, FaEdit, FaCheck } from 'react-icons/fa';

import {
  useGetAllUserQuery,
  useDeleteUserMutation,
} from '../../slices/usersApiSlice';

import Message from '../../components/Message';
import Loader from '../../components/Loader';

const UserList = () => {
  const { data: users, isLoading, error, refetch } = useGetAllUserQuery();

  const [deleteUser, { isLoading: isDeleting }] = useDeleteUserMutation();

  const deleteHandler = async (id) => {
    if (window.confirm('Are yo sure want to delete user?')) {
      try {
        await deleteUser(id);
        toast.success('User deleted successfully.');
        refetch();
      } catch (error) {
        toast.error(error?.data?.message || error.error);
      }
    }
  };

  return (
    <Fragment>
      <h1>Users</h1>
      {isDeleting && <Loader />}
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <Table striped bordered hover responsive className='table-sm'>
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>EMAIL</th>
              <th>ADMIN</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {users.map(({ _id, name, email, isAdmin }) => (
              <tr key={_id}>
                <td>{_id}</td>
                <td>{name}</td>
                <td>
                  <Link to={`mailto:${email}`}>{email}</Link>
                </td>
                <td>{isAdmin ? <FaCheck /> : <FaTimes />}</td>
                <td>
                  <Link to={`/admin/user/${_id}/edit`}>
                    <FaEdit />
                  </Link>
                  <Link className='ms-2' onClick={() => deleteHandler(_id)}>
                    <FaTrash />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Fragment>
  );
};

export default UserList;
