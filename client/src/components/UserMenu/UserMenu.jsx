import React from 'react'

import * as C from './style'

const UserMenu = () => {
  return (
    <>
      <C.Container>
        <C.Box>
          <C.Title>Dashboard</C.Title>
          <C.NavLinks to="/dashboard/user/profile">
            Create Category
          </C.NavLinks>
          <C.NavLinks to="/dashboard/user/orders">
            Create Product
          </C.NavLinks>
        </C.Box>
      </C.Container>
    </>
  )
}

export default UserMenu