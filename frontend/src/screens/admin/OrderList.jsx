import { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Table } from 'react-bootstrap';
import { FaTimes, FaCheck } from 'react-icons/fa';

import { useGetAllOrdersQuery } from '../../slices/ordersApiSlice';

import Message from '../../components/Message';
import Loader from '../../components/Loader';

const OrderList = () => {
  const { data: orders, isLoading, error } = useGetAllOrdersQuery();

  return (
    <Fragment>
      <h1>Orders</h1>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <Table striped bordered hover responsive className='table-sm'>
          <thead>
            <tr>
              <th>ID</th>
              <th>USER</th>
              <th>DATE</th>
              <th>TOTAL</th>
              <th>PAID</th>
              <th>DELIVERED</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(
              ({
                _id,
                user,
                createdAt,
                totalPrice,
                isPaid,
                isDelivered,
                deliveredAt,
              }) => (
                <tr key={_id}>
                  <td>
                    <Link to={`/orders/${_id}`}>{_id}</Link>
                  </td>
                  <td>{user && user.name}</td>
                  <td>{createdAt.substring(0, 10)}</td>
                  <td>${totalPrice}</td>
                  <td>{isPaid ? <FaCheck /> : <FaTimes />}</td>
                  <td>
                    {isDelivered ? deliveredAt.substring(0, 10) : <FaTimes />}
                  </td>
                </tr>
              )
            )}
          </tbody>
        </Table>
      )}
    </Fragment>
  );
};

export default OrderList;
