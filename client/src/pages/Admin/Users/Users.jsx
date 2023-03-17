import React from 'react'
import Layout from '../../../components/Layout/Layout';
import AdminMenu from '../../../components/AdminMenu/AdminMenu';

import * as C from './style';

const Users = () => {
  return (
    <Layout title={"Dashboard - All Users"}>
      <C.Container>
        <C.BoxContent>
          <AdminMenu />
        </C.BoxContent>
        <C.BoxContent>
          <h1>All Users</h1>
        </C.BoxContent>
      </C.Container>
    </Layout>
  )
}

export default Users