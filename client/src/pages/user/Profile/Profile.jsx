import React from 'react'
import UserMenu from '../../../components/UserMenu/UserMenu';
import Layout from '../../../components/Layout/Layout';

const Profile = () => {
  return (
    <Layout title={"Your Profile"}>
      <div>
        <UserMenu />
      </div>
      <div>
        <h1>Your profile</h1>
      </div>
    </Layout>
  )
}

export default Profile