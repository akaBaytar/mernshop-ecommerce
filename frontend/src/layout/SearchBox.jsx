import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import { FaSearch } from 'react-icons/fa';

const SearchBox = () => {
  const navigate = useNavigate();

  const { keyword: urlKeyword } = useParams();

  const [keyword, setKeyword] = useState(urlKeyword || '');

  const submitHandler = (e) => {
    e.preventDefault();

    if (keyword.trim()) {
      navigate(`/search/${keyword}`);
      setKeyword('');
    } else {
      navigate('/');
    }
  };

  return (
    <Form onSubmit={submitHandler} className='d-flex mb-4 mt-3'>
      <Form.Control
        type='text'
        name='q'
        placeholder='Search...'
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        className='mr-sm-2 ml-sm-5'
      />
      <Button
        type='submit'
        variant='outline-dark'
        className='p-2 mx-2 d-flex align-items-center gap-1'>
        <FaSearch /> <span>Search</span>
      </Button>
    </Form>
  );
};

export default SearchBox;
