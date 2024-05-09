import { useEffect, useState, Fragment } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import { toast } from 'react-toastify';

import FormContainer from '../../components/FormContainer';
import Message from '../../components/Message';
import Loader from '../../components/Loader';

import {
  useUpdateProductMutation,
  useGetProductDetailsQuery,
} from '../../slices/productsApiSlice';

const ProductEdit = () => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState('');
  const [brand, setBrand] = useState('');
  const [category, setCategory] = useState('');
  const [countInStock, setCountInStock] = useState(0);
  const [description, setDescription] = useState('');

  const { id } = useParams();

  const {
    data: product,
    isLoading,
    error,
    refetch,
  } = useGetProductDetailsQuery(id);

  const [updateProduct, { isLoading: isUpdating }] = useUpdateProductMutation();

  const navigate = useNavigate();

  useEffect(() => {
    if (product) {
      setName(product.name);
      setPrice(product.price);
      setImage(product.image);
      setBrand(product.brand);
      setCategory(product.category);
      setCountInStock(product.countInStock);
      setDescription(product.description);
    }
  }, [product]);

  const submitHandler = async (e) => {
    e.preventDefault();

    const updatedProduct = {
      _id: id,
      name,
      price,
      image,
      brand,
      category,
      countInStock,
      description,
    };

    const res = await updateProduct(updatedProduct);

    if (res.error) {
      toast.error(error);
    } else {
      toast.success('Product updated succesfully.');
      refetch();
      navigate('/admin/products');
    }
  };

  return (
    <Fragment>
      <div className='d-flex justify-content-between align-items-center'>
        <h1 className='my-2'>Edit Product</h1>
        <Link to='/admin/products' className='btn btn-dark btn-sm my-2'>
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
            <Form.Group controlId='price' className='mt-2'>
              <Form.Label>Price:</Form.Label>
              <Form.Control
                type='number'
                placeholder='Enter price'
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId='brand' className='mt-2'>
              <Form.Label>Brand:</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter brand'
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId='countInStock' className='mt-2'>
              <Form.Label>Count in Stock:</Form.Label>
              <Form.Control
                type='number'
                placeholder='Enter countInStock'
                value={countInStock}
                onChange={(e) => setCountInStock(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId='category' className='mt-2'>
              <Form.Label>Category:</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter category'
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId='description' className='mt-2'>
              <Form.Label>Description:</Form.Label>
              <Form.Control
                as='textarea'
                rows={6}
                placeholder='Enter description'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Form.Group>
            <div className='d-grid'>
              <Button type='submit' variant='dark' className='mt-4'>
                Update Product
              </Button>
            </div>
          </Form>
        )}
      </FormContainer>
    </Fragment>
  );
};

export default ProductEdit;
