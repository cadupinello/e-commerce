import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'

import { useAuth } from './Hooks/useAuth';

import HomePage from './pages/HomePage';
import About from './pages/About';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';
import ForgotPassword from './pages/ForgotPassword';
import Policy from './pages/Policy';
import Orders from './pages/User/Orders';
import Register from './pages/Auth/Register';
import Login from './pages/Auth/Login';
import AdminDashboard from './pages/Admin/AdminDashboard';
import Dashboard from './pages/User/Dashboard';
import Profile from './pages/User/Profile';
import Product from './pages/Admin/Product';
import Category from './pages/Admin/Category';
import Users from './pages/Admin/Users';


function App() {
  const { auth, admin, loading } = useAuth();

  if(loading) {
      return <h1>Loading...</h1>
  }

  return (
    <div>
      <Router>
        <Routes>
        <Route path="/" element={auth ? <HomePage /> : <Navigate to="/login" /> } />
        <Route path="/dashboard/user" element={auth ?  <Dashboard /> : <Navigate to='/' />}  />
        <Route path="/dashboard/user/orders" element={auth ?  <Orders /> : <Navigate to='/' />}  />
        <Route path="/dashboard/user/profile" element={auth ?  <Profile /> : <Navigate to='/' />}  />

        <Route path="/dashboard/admin" element={admin ?  <AdminDashboard /> : <Navigate to='/' />}  />
        <Route path="/dashboard/admin/create-category" element={auth && admin ?  <Category /> : <Navigate to='/login' />}  />
        <Route path="/dashboard/admin/create-product" element={admin ?  <Product /> : <Navigate to='/login' />}  />
        <Route path="/dashboard/admin/users" element={admin ?  <Users /> : <Navigate to='/login' />}  />
        
        <Route path="/register" element={!auth ? <Register /> : <Navigate to='/' />} />
        <Route path="/login" element={!auth ? <Login /> : <Navigate to='/' />} />
        <Route path='/forgot-password' element={!auth ? <ForgotPassword /> : <Navigate to='/' />}  />
        
        <Route path="/about" element={<About /> }  />
        <Route path="/contact" element={<Contact /> }  />
        <Route path="/policy" element={<Policy /> }  />
        <Route path="*" element={<NotFound /> }  />

        </Routes>
      </Router>
    </div>
  )
}

export default App
