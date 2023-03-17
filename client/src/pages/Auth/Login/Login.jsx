import React, { useState, useEffect } from 'react'
import Layout from '../../../components/Layout/Layout';
import FormLayout from '../../../components/FormLayout/FormLayout';
import * as C from './style'
import Message from '../../../components/Message/Messages';
import { useNavigate } from 'react-router-dom';
// reducer register user
import { useDispatch, useSelector } from 'react-redux';

import { login, reset } from '../../../slices/authSlice'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const navigate = useNavigate()

  const dispatch = useDispatch();

  const { isLoading, isError } = useSelector(state => state.auth);

  const handleSubmit = (e) => {
    e.preventDefault()

    const user = {
      email,
      password,
    }

    navigate('/')

    setEmail('')
    setPassword('')

    dispatch(login(user))
  }

  useEffect(() => {
    dispatch(reset())
  }, [dispatch])

  return (
    <Layout>
      <FormLayout>
          <C.Title>Login</C.Title>
          <C.SubTitle>Enter your account</C.SubTitle>
          <C.Form onSubmit={handleSubmit}>
            <C.Input 
              type="email" 
              placeholder="Insira seu email" 
              value={email || ''}
              onChange={(e) => setEmail(e.target.value)}
            />
            <C.Input 
              type="password" 
              placeholder="Insira sua senha" 
              value={password || ''}
              onChange={(e) => setPassword(e.target.value)}  
            />
            {isError && <Message type="error" msg={isError} />}
            {isLoading ? <C.InputSubmit disabled value="Carregando..." /> : <C.InputSubmit type="submit" value="Login" />}
            <C.Button onClick={() => {navigate('/forgot-password')}}>Forgot your password?</C.Button>
          </C.Form>
      </FormLayout>
    </Layout>
  )
}

export default Login