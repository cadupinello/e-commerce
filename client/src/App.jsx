import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage';
import About from './pages/About/About';
import Contact from './pages/Contact/Contact';
import Policy from './pages/Policy/Policy';
import PagenotFound from './pages/NotFound/PagenotFound';
import Register from './pages/Auth/Register/Register';
import Login from './pages/Auth/Login/Login';
import ForgotPassword from './pages/Auth/ForgotPassword/ForgotPassword';
import Dashboard from './pages/user/Dashboard';
import AdminDashboard from './pages/Admin/AdminDashboard';
import CreateCategory from './pages/Admin/Category/CreateCategory';
import CreateProduct from './pages/Admin/Product/CreateProduct';
import Users from './pages/Admin/Users/Users';

import { useAuth } from './Hooks/useAuth';

// styled components theme provider
import { ThemeProvider } from 'styled-components';
import theme from './theme';
import Orders from './pages/user/Orders/Orders';
import Profile from './pages/user/Profile/Profile';

function App() {
  const { auth, admin, loading } = useAuth();

  if (loading) {
    return (
        <h1>Loading...</h1>
    );
  }

  return (
   <ThemeProvider theme={theme}> 
     <Router>
      <Routes>
        <Route path="/" element={auth ? <HomePage /> : <Navigate to="/login" /> } />
        <Route path="/dashboard/user" element={auth ?  <Dashboard /> : <Navigate to='/' />}  />
        <Route path="/dashboard/user/orders" element={auth ?  <Orders /> : <Navigate to='/' />}  />
        <Route path="/dashboard/user/profile" element={auth ?  <Profile /> : <Navigate to='/' />}  />

        <Route path="/dashboard/admin" element={admin ?  <AdminDashboard /> : <Navigate to='/' />}  />
        <Route path="/dashboard/admin/create-category" element={admin ?  <CreateCategory /> : <Navigate to='/login' />}  />
        <Route path="/dashboard/admin/create-product" element={admin ?  <CreateProduct /> : <Navigate to='/login' />}  />
        <Route path="/dashboard/admin/users" element={admin ?  <Users /> : <Navigate to='/login' />}  />
        
        <Route path="/register" element={!auth ? <Register /> : <Navigate to='/' />} />
        <Route path="/login" element={!auth ? <Login /> : <Navigate to='/' />} />
        <Route path='/forgot-password' element={!auth ? <ForgotPassword /> : <Navigate to='/' />}  />
        
        <Route path="/about" element={<About /> }  />
        <Route path="/contact" element={<Contact /> }  />
        <Route path="/policy" element={<Policy /> }  />
        <Route path="*" element={<PagenotFound /> }  />
      </Routes>
    </Router>
   </ThemeProvider>
  )
}

export default App
