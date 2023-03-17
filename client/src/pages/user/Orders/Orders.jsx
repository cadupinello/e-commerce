import React from 'react'
import Layout from '../../../components/Layout/Layout';
import UserMenu from '../../../components/UserMenu/UserMenu';

const Orders = () => {
  return (
    <Layout title={"Your Orders"}>
      <div>
        <UserMenu />
      </div>
      <div>
        <h1>Your orders</h1>
      </div>
    </Layout>
  )
}

export default Orders