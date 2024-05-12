import { Fragment } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Table, Button, Col, Row } from 'react-bootstrap';
import { toast } from 'react-toastify';

import { FaEdit, FaTrash } from 'react-icons/fa';

import Loader from '../../components/Loader';
import Message from '../../components/Message';
import Pagination from '../../components/Pagination';

import {
  useGetAllProductsQuery,
  useCreateProductMutation,
  useDeleteProductMutation,
} from '../../slices/productsApiSlice';

const ProductList = () => {
  const { pageNumber } = useParams();

  const { data, isLoading, error, refetch } = useGetAllProductsQuery({
    pageNumber,
  });

  const [createProduct, { isLoading: isLoadingCreateProduct }] =
    useCreateProductMutation();

  const [deleteProduct, { isLoading: isDeleting }] = useDeleteProductMutation();

  const createProductHandler = async () => {
    if (window.confirm('Are you sure want to create new product?')) {
      try {
        await createProduct();
        toast.success('Product deleted successfully.');
        refetch();
      } catch (error) {
        toast.error(error?.data?.message || error.error);
      }
    }
  };

  const deleteHandler = async (id) => {
    if (window.confirm('Are you sure want to delete product?')) {
      try {
        await deleteProduct(id);
        refetch();
      } catch (error) {
        toast.error(error?.data?.message || error.error);
      }
    }
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
      {isDeleting && <Loader />}
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>
          {error?.data?.message || error.error}
        </Message>
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
              {data.products.map(({ _id, name, price, category, brand }) => (
                <tr key={_id}>
                  <td>
                    <Link to={`/products/${_id}`}>{_id}</Link>
                  </td>
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
          <Pagination pages={data.pages} page={data.page} isAdmin={true} />
        </Fragment>
      )}
    </Fragment>
  );
};

export default ProductList;
