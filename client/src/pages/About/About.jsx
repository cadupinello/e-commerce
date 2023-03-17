import React from 'react'
import Layout from '../../components/Layout/Layout';
import AboutImg from '../../assets/about.jpg'

import * as C from './style';

const About = () => {
  return (
    <Layout title={"About us - Ecommerce app"}>
      <C.Container>
        <C.Box>
          <C.Image src={AboutImg} alt="" />
        </C.Box>
        <C.Box>
          <C.Title>About</C.Title>  
          <C.Content>
            loren ipsum dolor sit amet consectetur adipisicing elit. Quisquam, ipsam loren ipsum dolor sit amet consectetur adipisicing elitloren ipsum dolor sit amet consectetur adipisicing elit loren ipsum dolor sit amet consectetur adipisicing elitloren ipsum dolor sit amet consectetur adipisicing elit.
          </C.Content>
        </C.Box>
      </C.Container>
    </Layout>
  )
}

export default About