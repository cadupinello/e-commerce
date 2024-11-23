import React, { useState, useEffect } from 'react'
import { IoCart, IoLogOut, IoHome, IoPerson } from 'react-icons/io5'

import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logout, reset } from '../../slices/Auth'
import { useAuth } from '../../hooks/useAuth';
import { Badge } from 'antd';
import * as Styled from './styled'
import { Tooltip } from '@mui/material'
import Logo from '../../assets/logo.svg'

const Navbar = ({ cartData }) => {
  const [query, setQuery] = useState("");
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


    if (query) {
      return navigate(`/search?q=${query}`)
    }
  }

  useEffect(() => {
    console.log(cartData);
  }, [cartData])

  return (
    <>
      <Styled.Nav>
        <Styled.Logo to={"/"}>
          <img src={Logo} alt="logo" />
        </Styled.Logo>
        <ul>
          {/*  <Styled.Input
            type="text"
            className="form-control me-2"
            placeholder="Pesquisar"
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch(e)}
          />
          */}
          {auth ? (
            <>
              <li>
                <Tooltip title="Inicio">
                  <Styled.NavItem to="/"><IoHome style={{ width: "25px", height: "25px" }} /></Styled.NavItem>
                </Tooltip>
              </li>
              <li>
                <Tooltip title="Carrinho">
                  <Styled.NavItem to="/cart">
                    <Badge count={cartData && cartData.length || 0}>
                      <IoCart style={{ width: "25px", height: "25px", color: "#fff" }} />
                    </Badge>
                  </Styled.NavItem>
                </Tooltip>
              </li>
            </>
          ) : (
            <>
              <li>
                <Tooltip title="registrar-se">
                  <Styled.NavItem to="/register">Registrar</Styled.NavItem>
                </Tooltip>
              </li>
              <li>
                <Tooltip title="Login">
                  <Styled.NavItem to="/login">Login</Styled.NavItem>
                </Tooltip>
              </li>
            </>
          )
          }
          {user && (
            <li>
              {admin ? (
                <>
                  <Tooltip title="Painel Administrativo">
                    <Styled.NavItem to='/dashboard/admin'><IoPerson style={{ width: "25px", height: "25px" }} /></Styled.NavItem>
                  </Tooltip>
                </>
              )
                : (
                  <>
                    <Tooltip title="Painel do Usuário">
                      <Styled.NavItem to='/dashboard/user'><IoPerson style={{ width: "25px", height: "25px" }} /></Styled.NavItem>
                    </Tooltip>
                  </>
                )}
            </li>
          )}
          {user && (
            <Tooltip title="Sair">
              <Styled.Logout onClick={handleLogout}>
                <IoLogOut style={{ width: "25px", height: "25px" }} />
              </Styled.Logout>
            </Tooltip>
          )}
        </ul>
      </Styled.Nav>
    </>
  )
}

export default Navbar