import React from 'react'
import Layout from '../../components/Layout';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import MenuDashboard from '../../components/MenuDashboard';

const AdminDashboard = () => {
  const { user } = useSelector(state => state.auth);

  return (
    <Layout>
      <div className="container d-flex  align-items-center justify-content-center" style={{minHeight: "400px"}}>
        <div className='me-5 '>
          <MenuDashboard />
        </div>
        <div>
          <h1>Dados pessoais</h1>
          <p>Nome: {user.user.name} </p>
          <p>E-mail: {user.user.email} </p>
          <p>Contato: {user.user.phone} </p>
        </div>
      </div>
    </Layout>
  )
}

export default AdminDashboard