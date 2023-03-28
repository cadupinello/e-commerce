import React, {useState, useEffect} from 'react'
import { IoCart, IoLogOut, IoHome, IoPerson } from 'react-icons/io5'

import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logout, reset } from '../slices/Auth'
import { useAuth } from '../Hooks/useAuth';
import { Badge } from 'antd';

const Navbar = ({cartData}) => {
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

  useEffect(() => {
    console.log(cartData);
  }, [cartData])

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
                    <NavLink className="nav-link" to="/"><IoHome style={{width: "25px", height: "25px"}}/></NavLink>
                  </li>
                  <li>
                    <NavLink className="nav-link" to="/cart">
                      <Badge count={cartData && cartData.length || 0}>
                        <IoCart style={{width: "25px", height: "25px"}} />
                      </Badge>
                    </NavLink>
                  </li>
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
                <li>
                  {admin ? (
                    <>
                      <NavLink className='nav-link' to='/dashboard/admin'><IoPerson style={{width: "25px", height: "25px"}}/></NavLink>
                    </>
                  )
                  : (
                    <>
                      <NavLink className='nav-link' to='/dashboard/user'><IoPerson style={{width: "25px", height: "25px"}}/></NavLink>
                    </>
                  )}
                </li>
                  )}
              {user && (
                <button className='nav-link btn' onClick={handleLogout}>
                  <IoLogOut style={{width: "25px", height: "25px"}}/>
                </button>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  )
}

export default Navbar