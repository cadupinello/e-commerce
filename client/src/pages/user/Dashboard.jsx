import React from 'react'
import UserMenu from '../../components/UserMenu/UserMenu';
import Layout from '../../components/Layout/Layout';

import * as C from './style'

import { useDispatch, useSelector } from 'react-redux';


const Dashboard = () => {
  const { user } = useSelector(state => state.auth);

  return (
    <Layout title={"Dashboard - Ecommerce App"}> 
      <C.Container>
        <C.Box>
          <UserMenu />
        </C.Box>
        <C.BoxContent>
            <C.Title>Dados Usúario</C.Title>
          <C.Content>
            <C.Text>{user?.user?.name}</C.Text>
          </C.Content>
          <C.Content>
            <C.Text>{user?.user?.email}</C.Text>
          </C.Content>
          <C.Content>
            <C.Text>{user?.user?.address}</C.Text>
          </C.Content>
        </C.BoxContent>
      </C.Container>
    </Layout>
  )
}

export default Dashboard