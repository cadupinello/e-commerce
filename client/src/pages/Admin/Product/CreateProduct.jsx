import React from 'react'
import Layout from '../../../components/Layout/Layout';
import AdminMenu from '../../../components/AdminMenu/AdminMenu';

import * as C from './style';

const CreateProduct = () => {
  return (
    <Layout title={"Dashboard - Create Product"}>
      <C.Container>
        <C.BoxContent>
          <AdminMenu />
        </C.BoxContent>
        <C.BoxContent>
          <h1>Create Product</h1>
        </C.BoxContent>
      </C.Container>
    </Layout>
  )
}

export default CreateProduct