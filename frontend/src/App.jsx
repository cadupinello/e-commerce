import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'

import { useAuth } from './hooks/useAuth';

import HomePage from './pages/homepage';
import About from './pages/about';
import Contact from './pages/contact';
import NotFound from './pages/notFound';
import ForgotPassword from './pages/Auth/ForgotPassword';
import Policy from './pages/policy';
import Orders from './pages/User/Orders';
import Register from './pages/Auth/Register';
import Login from './pages/Auth/Login';
import AdminDashboard from './pages/Admin/dash';
import Dashboard from './pages/User/Dashboard';
import Profile from './pages/User/Profile';
import Product from './pages/Admin/Product';
import Category from './pages/Admin/Category';
import Users from './pages/Admin/Users';
import AllProducts from './pages/Admin/allProducts';
import UpdateProduct from './pages/Admin/UpdateProduct';
import Search from './pages/search';
import ProductDetails from './pages/productDetails';
import CartPage from './pages/cartPage';


function App() {
  const { auth, admin, loading } = useAuth();

  if (loading) {
    return <h1>Loading...</h1>
  }

  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path='/cart' element={<CartPage />} />
          <Route path="/dashboard/user" element={auth ? <Dashboard /> : <Navigate to='/' />} />
          <Route path="/dashboard/user/orders" element={auth ? <Orders /> : <Navigate to='/' />} />
          <Route path="/dashboard/user/profile" element={auth ? <Profile /> : <Navigate to='/' />} />

          <Route path="/dashboard/admin" element={admin ? <AdminDashboard /> : <Navigate to='/' />} />
          <Route path="/dashboard/admin/create-category" element={auth && admin ? <Category /> : <Navigate to='/login' />} />
          <Route path="/dashboard/admin/create-product" element={admin ? <Product /> : <Navigate to='/login' />} />
          <Route path="/dashboard/admin/product/:slug" element={admin ? <UpdateProduct /> : <Navigate to='/login' />} />
          <Route path="/dashboard/admin/users" element={admin ? <Users /> : <Navigate to='/login' />} />
          <Route path="/dashboard/admin/all-products" element={admin ? <AllProducts /> : <Navigate to='/login' />} />

          <Route path="/register" element={!auth ? <Register /> : <Navigate to='/' />} />
          <Route path="/login" element={!auth ? <Login /> : <Navigate to='/' />} />
          <Route path='/forgot-password' element={!auth ? <ForgotPassword /> : <Navigate to='/' />} />

          <Route path="/product/:slug" element={<ProductDetails />} />
          <Route path="search" element={<Search />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/policy" element={<Policy />} />
          <Route path="*" element={<NotFound />} />

        </Routes>
      </Router>
    </div>
  )
}

export default App
