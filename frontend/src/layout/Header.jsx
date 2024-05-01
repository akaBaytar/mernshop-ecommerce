import { LinkContainer } from 'react-router-bootstrap';

import { Navbar, Nav, Container } from 'react-bootstrap';
import { FaShoppingBag, FaUser } from 'react-icons/fa';

import LOGO from '/logo.png';

const Header = () => {
  return (
    <header>
      <Navbar bg='dark' variant='dark' expand='md' collapseOnSelect>
        <Container>
          <LinkContainer to='/'>
            <Navbar.Brand className='d-flex align-items-center'>
              <img src={LOGO} alt='logo' width={40} />
              <span>Mern Shop</span>
            </Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls='navbar-nav' className='px-2' />
          <Navbar.Collapse id='navbar-nav'>
            <Nav className='ms-auto'>
              <LinkContainer to='/cart'>
                <Nav.Link className='d-flex align-items-center gap-1'>
                  <FaShoppingBag />
                  Cart
                </Nav.Link>
              </LinkContainer>
              <LinkContainer to='/login'>
                <Nav.Link className='d-flex align-items-center gap-1'>
                  <FaUser />
                  Login
                </Nav.Link>
              </LinkContainer>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
