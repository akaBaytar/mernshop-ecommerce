import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Navbar, Nav, Container, Badge } from 'react-bootstrap';
import { FaShoppingBag, FaUser } from 'react-icons/fa';

import LOGO from '/logo.png';

const Header = () => {
  const { cartItems } = useSelector((state) => state.cart);
  const itemsInCarts = cartItems.reduce((acc, item) => acc + item.qty, 0);

  const { userInfo } = useSelector((state) => state.auth);

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
                <Link to='/profile'>
                  <Nav.Link
                    as='span'
                    className='d-flex align-items-center gap-1'>
                    <FaUser />
                    {userInfo.name}
                  </Nav.Link>
                </Link>
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
