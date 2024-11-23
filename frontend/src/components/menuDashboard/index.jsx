import React from 'react'
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth'
import * as Styled from './styled'

const MenuDashboard = () => {
  const { admin } = useAuth();

  return (
    <>
      <Styled.ListItem>
        {admin ? (
          <>
            <ul>
              <li>
                <NavLink to='/dashboard/admin/create-category'>
                  Cadastrar categoria
                </NavLink>
              </li>
              <li>
                <NavLink to='/dashboard/admin/create-product'>
                  Cadastrar produto
                </NavLink>
              </li>
              <li>
                <NavLink to='/dashboard/admin/all-products'>
                  Produtos
                </NavLink>
              </li>
              <li>
                <NavLink to='/dashboard/admin/create-users'>
                  Usúarios
                </NavLink>
              </li>
            </ul>
          </>
        )
          : (
            <p>User DashBoard</p>
          )
        }
      </Styled.ListItem>
    </>
  )
}

export default MenuDashboard