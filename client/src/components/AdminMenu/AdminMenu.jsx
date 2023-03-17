import React from 'react'

import * as C from './styles'

const AdminMenu = () => {
  return (
    <>
      <C.Container>
        <C.Box>
          <C.Title>Painel Administrativo</C.Title>
          <C.NavLinks to="/dashboard/admin/create-category">
            Create Category
          </C.NavLinks>
          <C.NavLinks to="/dashboard/admin/create-product">
            Create Product
          </C.NavLinks>
          <C.NavLinks to="/dashboard/admin/users">
            Users
          </C.NavLinks>
        </C.Box>
      </C.Container>
    </>
  )
}

export default AdminMenu