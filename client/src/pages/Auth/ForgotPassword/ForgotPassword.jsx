import React,{ useState, useEffect } from 'react'
import FormLayout from '../../../components/FormLayout/FormLayout';
import Layout from '../../../components/Layout/Layout';
import * as C from './style' 

import { useNavigate } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';

import { forgotPassword, reset } from '../../../slices/authSlice';

const ForgotPassword = () => {
  const [email, setEmail] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [answer, setAnswer] = useState('')

  const navigate = useNavigate()

  const dispatch = useDispatch();

  const { isLoading, isError } = useSelector(state => state.auth);

  const handleSubmit = (e) => {
    e.preventDefault()

    const user = {
      email,
      newPassword,
      answer,
    }

    navigate('/login')

    dispatch(forgotPassword(user))
  }

  useEffect(() => {
    dispatch(reset())
  }, [dispatch])

  return (
    <Layout>
      <FormLayout>
        <C.Title>Forgot Password</C.Title>
        <C.SubTitle>Enter your email to reset your password</C.SubTitle>
        <C.Form onSubmit={handleSubmit}>
          <C.Input 
            type="email" 
            placeholder="Email" 
            value={email || ''}
            onChange={(e) => setEmail(e.target.value)}
          />
          <C.Input 
            type="text" 
            placeholder="Answer" 
            value={answer || ''}
            onChange={(e) => setAnswer(e.target.value)}
          />
          <C.Input 
            type="password" 
            placeholder="New Password" 
            value={newPassword || ''}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <C.InputSubmit type="submit" value="Reset" />
        </C.Form>
      </FormLayout>
    </Layout>
  )
}

export default ForgotPassword