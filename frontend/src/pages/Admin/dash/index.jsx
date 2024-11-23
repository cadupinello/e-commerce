import React from 'react'
import Layout from '../../../components/layout';
import { useSelector } from 'react-redux';
import MenuDashboard from '../../../components/menuDashboard';
import * as Styled from './styled'
import { FormControl, OutlinedInput } from '@mui/material';
import { Button } from 'antd';

const AdminDashboard = () => {
  const { user } = useSelector(state => state.auth);

  return (
    <Layout>
      <Styled.Container>
        <h4>Painel Administrativo</h4>
        <span>Gerencie seus produtos e categorias, além de visualizar seus dados pessoais</span>
        <hr />
        <Styled.Content>
          <MenuDashboard />
          <Styled.Profile>
            <h4>Dados Pessoais</h4>
            <span>Confira seus dados pessoais e faça alterações</span>
            <FormControl>
              <label htmlFor="name">Nome</label>
              <Styled.Input
                value={user.user.name}
                readOnly
              />
            </FormControl>
            <FormControl>
              <label htmlFor="email">Email</label>
              <Styled.Input
                value={user.user.email}
                readOnly
              />
            </FormControl>
            <FormControl>
              <label htmlFor="phone">Telefone</label>
              <Styled.Input
                value={user.user.phone}
                readOnly
              />
            </FormControl>
            <Button
              type="submit"
              style={{ marginTop: '1rem', width: 'fit-content' }}
              color="primary"
              variant='contained'
              disabled
            >Alterar dados</Button>
          </Styled.Profile>
        </Styled.Content>
      </Styled.Container>
    </Layout>
  )
}

export default AdminDashboard