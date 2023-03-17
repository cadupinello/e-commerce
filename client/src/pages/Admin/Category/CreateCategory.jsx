import React from 'react'
import Layout from '../../../components/Layout/Layout';
import AdminMenu from '../../../components/AdminMenu/AdminMenu';

import * as C from './style';

const CreateCategory = () => {
  return (
    <Layout title={"Dashboard - Create Category"}>
      <C.Container>
        <C.BoxContent>
          <AdminMenu />
        </C.BoxContent>
        <C.BoxContent>
          <h1>Create Category</h1>
        </C.BoxContent>
      </C.Container>
    </Layout>
  )
}

export default CreateCategory