import { Fragment } from 'react';
import { Outlet } from 'react-router-dom';

import { Container } from 'react-bootstrap';

import { ToastContainer } from 'react-toastify';

import Header from './layout/Header';
import Footer from './layout/Footer';

import 'react-toastify/ReactToastify.min.css';

const App = () => {
  return (
    <Fragment>
      <Header />
      <main className='py-3'>
        <Container>
          <Outlet />
        </Container>
      </main>
      <Footer />
      <ToastContainer />
    </Fragment>
  );
};

export default App;
