import React from 'react'
import Layout from '../../components/Layout/Layout';
import * as C from './style.js';

const PagenotFound = () => {
  return (
    <Layout title={"Go back - page not found"}>
      <C.Container>
        <C.Title>404</C.Title>
        <C.Content>Page Not Found</C.Content>
        <C.BtnLink to="/">Ir para a home</C.BtnLink>
      </C.Container>
    </Layout>
  )
}

export default PagenotFound