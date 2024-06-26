import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from 'react-router-dom';

import App from '../App.jsx';

import PrivateRoute from '../components/PrivateRoute.jsx';
import AdminRoute from '../components/AdminRoute.jsx';

import Home from '../screens/public/Home.jsx';
import Product from '../screens/public/Product.jsx';
import Cart from '../screens/public/Cart.jsx';
import Login from '../screens/public/Login.jsx';
import Register from '../screens/public/Register.jsx';

import Shipping from '../screens/private/Shipping.jsx';
import Profile from '../screens/private/Profile.jsx';
import Payment from '../screens/private/Payment.jsx';
import Order from '../screens/private/Order.jsx';
import OrderDetails from '../screens/public/OrderDetails.jsx';

import OrderList from '../screens/admin/OrderList.jsx';
import ProductList from '../screens/admin/ProductList.jsx';
import ProductEdit from '../screens/admin/ProductEdit.jsx';
import UserList from '../screens/admin/UserList.jsx';
import UserEdit from '../screens/admin/UserEdit.jsx';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route index={true} path='/' element={<Home />} />
      <Route path='/search/:keyword' element={<Home />} />
      <Route path='/page/:pageNumber' element={<Home />} />
      <Route path='/search/:keyword/page/:pageNumber' element={<Home />} />
      <Route path='/products/:id' element={<Product />} />
      <Route path='/cart' element={<Cart />} />
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />} />

      <Route element={<PrivateRoute />}>
        <Route path='/shipping' element={<Shipping />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/payment' element={<Payment />} />
        <Route path='/place-order' element={<Order />} />
        <Route path='/orders/:id' element={<OrderDetails />} />
      </Route>

      <Route element={<AdminRoute />}>
        <Route path='/admin/orders' element={<OrderList />} />
        <Route path='/admin/products' element={<ProductList />} />
        <Route path='/admin/products/:pageNumber' element={<ProductList />} />
        <Route path='/admin/product/:id/edit' element={<ProductEdit />} />
        <Route path='/admin/users' element={<UserList />} />
        <Route path='/admin/user/:id/edit' element={<UserEdit />} />
      </Route>
    </Route>
  )
);

export default router;
