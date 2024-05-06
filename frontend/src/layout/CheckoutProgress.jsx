import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';
import { Nav } from 'react-bootstrap';

import {
  Bs1Circle,
  Bs2Circle,
  Bs3Circle,
  Bs4Circle,
  Bs1CircleFill,
  Bs2CircleFill,
  Bs3CircleFill,
  Bs4CircleFill,
} from 'react-icons/bs';

const CheckoutProgress = ({ step1, step2, step3, step4 }) => {
  return (
    <Nav className='justify-content-center mb-4 checkout-progress-container'>
      <Nav.Item>
        {step1 ? (
          <div className='progress-link'>
            <Bs1CircleFill className='progress-icon' />
            <Link to='/cart'>Cart</Link>
          </div>
        ) : (
          <div className='progress-link'>
            <Bs1Circle className='progress-icon' />
            Cart
          </div>
        )}
      </Nav.Item>
      <Nav.Item>
        {step2 ? (
          <div className='progress-link'>
            <Bs2CircleFill className='progress-icon' />
            <Link to='/shipping'>Shipping</Link>
          </div>
        ) : (
          <div className='progress-link'>
            <Bs2Circle className='progress-icon' />
            Shipping
          </div>
        )}
      </Nav.Item>
      <Nav.Item>
        {step3 ? (
          <div className='progress-link'>
            <Bs3CircleFill className='progress-icon' />
            <Link to='/payment'>Payment</Link>
          </div>
        ) : (
          <div className='progress-link'>
            <Bs3Circle className='progress-icon' />
            Payment
          </div>
        )}
      </Nav.Item>
      <Nav.Item>
        {step4 ? (
          <div className='progress-link'>
            <Bs4CircleFill className='progress-icon' />
            <Link to='/place-order'>Complete</Link>
          </div>
        ) : (
          <div className='progress-link'>
            <Bs4Circle className='progress-icon' />
            Complete
          </div>
        )}
      </Nav.Item>
    </Nav>
  );
};

CheckoutProgress.propTypes = {
  step1: PropTypes.bool,
  step2: PropTypes.bool,
  step3: PropTypes.bool,
  step4: PropTypes.bool,
};

export default CheckoutProgress;
