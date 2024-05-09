import { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Table, Button, Col, Row } from 'react-bootstrap';
import { toast } from 'react-toastify';

import { FaEdit, FaTrash } from 'react-icons/fa';

import Loader from '../../components/Loader';
import Message from '../../components/Message';

import {
  useGetAllProductsQuery,
  useCreateProductMutation,
} from '../../slices/productsApiSlice';

const ProductList = () => {
  const {
    data: products,
    isLoading,
    error,
    refetch,
  } = useGetAllProductsQuery();

  const [createProduct, { isLoading: isLoadingCreateProduct }] =
    useCreateProductMutation();

  const createProductHandler = async () => {
    if (window.confirm('Are you sure want to create new product?')) {
      try {
        await createProduct();
        refetch();
      } catch (error) {
        toast.error(error?.data?.message || error.error);
      }
    }
  };

  const deleteHandler = (id) => {
    console.log(id, 'deleted.');
  };

  return (
    <Fragment>
      <Row className='align-items-center'>
        <Col>
          <h1>Products</h1>
        </Col>
        <Col className='text-end'>
          <Button
            className='btn-sm btn-dark my-3'
            onClick={createProductHandler}>
            <FaEdit />
            <span className='ms-1' style={{ fontSize: '0.65rem' }}>
              Create Product
            </span>
          </Button>
        </Col>
      </Row>
      {isLoadingCreateProduct && <Loader />}
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <Fragment>
          <Table striped hover responsive bordered className='table-sm'>
            <thead>
              <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>PRICE</th>
                <th>CATEGORY</th>
                <th>BRAND</th>
                <th>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {products.map(({ _id, name, price, category, brand }) => (
                <tr key={_id}>
                  <td>{_id}</td>
                  <td>{name}</td>
                  <td>${price}</td>
                  <td>{category}</td>
                  <td>{brand}</td>
                  <td>
                    <Link to={`/admin/product/${_id}/edit`}>
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
        </Fragment>
      )}
    </Fragment>
  );
};

export default ProductList;
