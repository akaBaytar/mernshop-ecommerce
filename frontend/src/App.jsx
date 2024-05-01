import { Fragment } from 'react';
import { Outlet } from 'react-router-dom';

import { Container } from 'react-bootstrap';

import Header from './layout/Header';
import Footer from './layout/Footer';

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
    </Fragment>
  );
};

export default App;
