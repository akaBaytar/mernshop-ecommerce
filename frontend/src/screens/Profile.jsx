import { Fragment } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';

import { logout } from '../slices/authSlice';
import { resetCartWhenLogout } from '../slices/cartSlice';

import { useLogoutMutation } from '../slices/usersApiSlice';

const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { userInfo } = useSelector((state) => state.auth);

  const [logoutApiCall] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      dispatch(resetCartWhenLogout());
      navigate('/');
    } catch (error) {
      console.error(error);
    }
  };

  console.log(userInfo);

  return (
    <Fragment>
      <h1>Profile</h1>
      <hr />
      <div className='d-flex align-items-center gap-2'>
        <h3 className='m-0'>{userInfo.name}</h3>
        <Button
          type='button'
          variant='danger'
          className='btn-sm'
          onClick={logoutHandler}>
          Logout
        </Button>
      </div>
      <p className='mt-3'>
        <strong>Email: </strong>
        {userInfo.email}
      </p>
      <p>
        <strong>User ID:</strong> {userInfo._id}
      </p>
    </Fragment>
  );
};

export default Profile;
