import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Navbar, Nav, Container, Badge, NavDropdown } from 'react-bootstrap';
import { FaShoppingBag, FaUser } from 'react-icons/fa';

import LOGO from '/logo.png';

import { useLogoutMutation } from '../slices/usersApiSlice';
import { logout } from '../slices/authSlice';
import { resetCartWhenLogout } from '../slices/cartSlice';

const Header = () => {
  const { cartItems } = useSelector((state) => state.cart);
  const itemsInCarts = cartItems.reduce((acc, item) => acc + item.qty, 0);

  const { userInfo } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

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

  return (
    <header>
      <Navbar bg='dark' variant='dark' expand='md' collapseOnSelect>
        <Container>
          <Link to='/'>
            <Navbar.Brand as='span' className='d-flex align-items-center'>
              <img src={LOGO} alt='logo' width={40} />
              <span>Mern Shop</span>
            </Navbar.Brand>
          </Link>
          <Navbar.Toggle aria-controls='navbar-nav' className='px-2' />
          <Navbar.Collapse id='navbar-nav'>
            <Nav className='ms-auto'>
              <Link to='/cart'>
                <Nav.Link
                  as='span'
                  className='position-relative d-flex align-items-center gap-1'>
                  <Badge pill bg='secondary' className='position-absolute'>
                    {itemsInCarts}
                  </Badge>
                  <FaShoppingBag />
                  Cart
                </Nav.Link>
              </Link>
              {userInfo ? (
                <NavDropdown title={userInfo.name} id='username'>
                  <NavDropdown.Item>
                    <Link to='/profile'>Profile</Link>
                  </NavDropdown.Item>
                  <NavDropdown.Item onClick={logoutHandler}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <Link to='/login'>
                  <Nav.Link
                    as='span'
                    className='d-flex align-items-center gap-1'>
                    <FaUser />
                    Login
                  </Nav.Link>
                </Link>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
