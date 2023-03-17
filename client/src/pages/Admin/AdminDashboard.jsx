import React from 'react'
import AdminMenu from '../../components/AdminMenu/AdminMenu'
import { useDispatch, useSelector } from 'react-redux';
import * as C from './style'
import Layout from '../../components/Layout/Layout';

const AdminDashboard = () => {
  const { user } = useSelector(state => state.auth)

  return (
    <Layout>
      <C.Container>
        <C.Box>
          <AdminMenu />
        </C.Box>
        <C.BoxContent>
          <C.Title>Dados</C.Title>
          <C.Content>
            <C.SubTitle>Admin Name:</C.SubTitle> <C.Text>{user.user.name}</C.Text>
          </C.Content>
         <C.Content>
          <C.SubTitle>Admin Email:</C.SubTitle> <C.Text>{user.user.email}</C.Text>
         </C.Content>
          <C.Content>
            <C.SubTitle>Admin Contact:</C.SubTitle> <C.Text>{user.user.phone}</C.Text>
          </C.Content>
        </C.BoxContent>
      </C.Container>
    </Layout>
  )
}

export default AdminDashboard