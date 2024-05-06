import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from 'react-router-dom';

import App from '../App.jsx';

import Home from '../screens/Home.jsx';
import Product from '../screens/Product.jsx';
import Cart from '../screens/Cart.jsx';
import Login from '../screens/Login.jsx';
import Register from '../screens/Register.jsx';
import Shipping from '../screens/Shipping.jsx';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route index={true} path='/' element={<Home />} />
      <Route path='/products/:id' element={<Product />} />
      <Route path='/cart' element={<Cart />} />
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />} />
      <Route path='/shipping' element={<Shipping />} />
    </Route>
  )
);

export default router;
