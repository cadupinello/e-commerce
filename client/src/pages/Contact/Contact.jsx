import React from 'react'
import Layout from '../../components/Layout/Layout';
import ContactImg from '../../assets/contact.jpg'
import { MdOutlineEmail, MdHeadsetMic, MdLocalPhone  } from 'react-icons/md';
import * as C from './style';

const Contact = () => {
  return (
    <Layout title={"Contact us - Ecommerce app"}>
      <C.Container>
        <C.Box>
          <C.Image src={ContactImg} alt="" />
        </C.Box>
        <C.Box>
          <C.Title>Contact Us</C.Title>  
          <C.Content>
            <MdOutlineEmail />teste@teste.com
          </C.Content>
          <C.Content>
            <MdHeadsetMic />+55 (11) 99999-9999
          </C.Content>
          <C.Content>
            <MdLocalPhone />+55 (11) 99999-9999
          </C.Content>
        </C.Box>
      </C.Container>
    </Layout>
  )
}

export default Contact