import React from 'react'
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth'

const MenuDashboard = () => {
  const { admin } = useAuth();

  return (
    <>
      <div>
        {admin ? (
          <>
            <h4>Bem vindo ao painel administrativo</h4>
            <ul className="list-group">
              <li className="list-group-item">
                <NavLink to='/dashboard/admin/create-category'>
                  Cadastrar categoria
                </NavLink>
              </li>
              <li className="list-group-item">
                <NavLink to='/dashboard/admin/create-product'>
                  Cadastrar produto
                </NavLink>
              </li>
              <li className="list-group-item">
                <NavLink to='/dashboard/admin/all-products'>
                  Produtos
                </NavLink>
              </li>
              <li className="list-group-item">
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
      </div>
    </>
  )
}

export default MenuDashboard