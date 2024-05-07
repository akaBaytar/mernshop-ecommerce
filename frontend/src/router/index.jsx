import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from 'react-router-dom';

import App from '../App.jsx';

import PrivateRoute from '../components/PrivateRoute.jsx';

import Home from '../screens/Home.jsx';
import Product from '../screens/Product.jsx';
import Cart from '../screens/Cart.jsx';
import Login from '../screens/Login.jsx';
import Register from '../screens/Register.jsx';
import Shipping from '../screens/Shipping.jsx';
import Profile from '../screens/Profile.jsx';
import Payment from '../screens/Payment.jsx';
import Order from '../screens/Order.jsx';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route index={true} path='/' element={<Home />} />
      <Route path='/products/:id' element={<Product />} />
      <Route path='/cart' element={<Cart />} />
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />} />

      <Route element={<PrivateRoute />}>
        <Route path='/shipping' element={<Shipping />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/payment' element={<Payment />} />
        <Route path='/place-order' element={<Order />} />
      </Route>
    </Route>
  )
);

export default router;
