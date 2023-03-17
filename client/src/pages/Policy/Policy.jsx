import React from 'react'
import Layout from '../../components/Layout/Layout';
import PolicyImg from '../../assets/policy.jpg'

import * as C from './style';

const Policy = () => {
  return (
    <Layout title={"Privacy Policy"}>
      <C.Container>
        <C.Box>
          <C.Image src={PolicyImg} alt="" />
        </C.Box>
        <C.Box>
          <C.Title>Policy</C.Title>  
          <C.Content>
            loren ipsum dolor sit amet consectetur adipisicing elit. Quisquam, ipsam loren ipsum dolor sit amet consectetur adipisicing elitloren ipsum dolor sit amet consectetur adipisicing elit loren ipsum dolor sit amet consectetur adipisicing elitloren ipsum dolor sit amet consectetur adipisicing elit. dolor sit amet consectetur adipisicing elit.dolor sit amet consectetur adipisicing elit.dolor sit amet consectetur adipisicing elit.
          </C.Content>
        </C.Box>
      </C.Container>
    </Layout>
  )
}

export default Policy