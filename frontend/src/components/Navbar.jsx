import React, {useState} from 'react'

import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logout, reset } from '../slices/Auth'
import { useAuth } from '../Hooks/useAuth';

const Navbar = () => {
  const [query , setQuery] = useState("");
  const { user } = useSelector((state) => state.auth);
  const { auth, admin } = useAuth();
  
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout())
    dispatch(reset())
    navigate('/login')
  }

  const handleSearch = (e) => {
    e.preventDefault();
   
    if(query) {
      return navigate(`/search?q=${query}`)
    }
  }

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <Link className='me-5' to={"/"}>
            <h4>E-Commerce</h4>
          </Link>
          <div className="collapse navbar-collapse">
            <ul className="navbar-nav mr-auto mb-2 mb-lg-0">
              <form onSubmit={handleSearch}>
                <input
                  type="text"
                  className="form-control me-2"
                  placeholder="Pesquisar"
                  onChange={(e) => setQuery(e.target.value)}
                />
              </form>
              {auth ? (
                <>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/">Home</NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/category">Categoria</NavLink>
                  </li>
                {user && (
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/cart">
                      Cart(0)
                    </NavLink>
                  </li>
              )}
                </>
              ): (
                <>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/register">Register</NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/login">Login</NavLink>
                  </li>
                </>
              )
              }
              {user && (
                <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Drop
                </a>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                  {admin ? (
                    <>
                      <li className='dropdown-item'>
                        <NavLink to='/dashboard/admin'>Dashboard</NavLink>
                      </li>
                    </>
                  )
                  : (
                    <>
                      <li className='dropdown-item'>
                        <NavLink to='/dashboard/user'>Dashboard</NavLink>
                      </li>
                    </>
                  )}
                  {user && (
                      <li className='dropdown-item'>
                        <button className='btn btn-sm btn-outline-danger' onClick={handleLogout}>
                           Logout
                        </button>
                      </li>
                  )}
                </ul>
              </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  )
}

export default Navbar