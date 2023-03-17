import React, { useState, useEffect } from 'react'
import Layout from '../../../components/Layout/Layout';
import FormLayout from '../../../components/FormLayout/FormLayout';
import * as C from './style'
import Messages from '../../../components/Message/Messages';

// reducer register user
import { useDispatch, useSelector } from 'react-redux';

import { register, reset } from '../../../slices/authSlice'

const Register = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [phone, setPhone] = useState('')
  const [address, setAddress] = useState('')
  const [answer, setAnswer] = useState('')

  const dispatch = useDispatch();

  const { isLoading, isError } = useSelector(state => state.auth);

  const handleSubmit = (e) => {
    e.preventDefault()
    
    const user = {
      name,
      email,
      password,
      phone,
      address,
      answer,
    };

    dispatch(register(user))

  }

  useEffect(() => {
    dispatch(reset())
  }, [dispatch])

  return (
    <Layout>
      <FormLayout>
          <C.Title>Register</C.Title>
          <C.SubTitle>Create your account</C.SubTitle>
          <C.Form onSubmit={handleSubmit}>
            <C.Input 
              type="text" 
              placeholder="Insira seu nome" 
              value={name || ''}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <C.Input 
              type="email" 
              placeholder="Insira seu email" 
              value={email || ''}
              onChange={(e) => setEmail(e.target.value)}
              required  
            />
            <C.Input 
              type="password" 
              placeholder="Insira sua senha" 
              value={password || ''}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <C.Input 
              type="text" 
              placeholder="Insira seu telefone" 
              value={phone || ''}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
            <C.Input 
              type="text" 
              placeholder="Insira seu endereço" 
              value={address || ''}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
            <C.Input 
              type="text" 
              placeholder="Qual é o seu jogo favorito?" 
              value={answer || ''}
              onChange={(e) => setAnswer(e.target.value)}
              required
            />
            {isError && <Messages type="error" msg={isError} />}
            {isLoading ? <C.InputSubmit disabled value="Cadastrando..." /> : <C.InputSubmit type="submit" value="Cadastrar" />}
            <C.Links to='/login'>Já tem uma conta? Faça login!</C.Links>
          </C.Form>
      </FormLayout>
    </Layout>
  )
}

export default Register