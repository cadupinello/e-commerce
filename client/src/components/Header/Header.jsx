import React, { useState } from 'react'
import { GiShoppingBag } from 'react-icons/gi'

import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../Hooks/useAuth'
import { logout, reset } from '../../slices/authSlice'

// styled components
import * as C from './style.js'

const Header = () => {
  const { auth, admin } = useAuth()
  const { user } = useSelector((state) => state.auth)

  const navigate = useNavigate()

  const dispatch = useDispatch()

  const handleLogout = () => {
    dispatch(logout())
    dispatch(reset())
    navigate('/login')

    console.log("sair")
  }

  return (
    <>
      <C.Navbar>
        <C.Logo>
          E-commerce
        </C.Logo>
        <C.NavMenu>
        <C.Ul>
          {auth ?
          (
            <>
              <C.Li>
                <C.NavItem to="/">Home</C.NavItem>
              </C.Li>
              <C.Li>
                <C.NavItem to="/category">Categoria</C.NavItem>
              </C.Li>
            {user && (
              <C.Li>
                <C.NavItem to="/cart">cart(0)</C.NavItem>
              </C.Li>
            )}
            </>
          ) : (
            <>
              <C.Li>
                <C.NavItem to="/register">Register</C.NavItem>
              </C.Li>
              <C.Li>
                <C.NavItem to="/login">Login</C.NavItem>
              </C.Li>
            </>
          )}
          {admin ? (
            <C.Li>
              <C.NavItem to="/dashboard/admin">Dashboard</C.NavItem>
            </C.Li> 
          ): (
            <C.Li>
              <C.NavItem to="/dashboard/user">Dashboard</C.NavItem>
            </C.Li>
          )}
        </C.Ul>
        </C.NavMenu>
        {user && (
          <C.Span onClick={handleLogout}>Sair</C.Span>
        )}
      </C.Navbar>
    </>
  )
}

export default Header