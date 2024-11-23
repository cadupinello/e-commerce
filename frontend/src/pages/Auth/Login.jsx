import React, { useState, useEffect } from 'react'
import Layout from '../../components/layout'

import { useDispatch, useSelector } from 'react-redux';

import { login, reset } from '../../slices/Auth'

import * as Styled from './styled'
import { Link } from 'react-router-dom';
import { IoRefresh, IoSend } from 'react-icons/io5';

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch();

  const { isLoading, isError, message } = useSelector(state => state.auth);

  const handleSubmit = (e) => {
    try {
      e.preventDefault()

      const user = {
        email,
        password,
      };

      dispatch(login(user))

    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    dispatch(reset())
  }, [dispatch])

  const messageError = () => {
    if (isError) {
      return <div className="alert alert-danger">{message}</div>
    }
    setTimeout(() => {
      dispatch(reset())
    }, 3000)

  }

  return (
    <>
      <Layout>
        <Styled.Container>
          <Styled.Content>
            <h4>Login</h4>
            <Styled.Form>
              <Styled.FormControl>
                <label htmlFor='email'>Email</label>
                <Styled.Input
                  type='email'
                  id='email'
                  className='form-control'
                  placeholder='Digite seu email'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Styled.FormControl>
              <Styled.FormControl>
                <label htmlFor='password'>Senha</label>
                <Styled.Input
                  type='password'
                  id='password'
                  className='form-control'
                  placeholder='Digite sua senha'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Styled.FormControl>
              {messageError(isError)}
              <Styled.Button
                type="submit"
                onClick={handleSubmit}
                disabled={isLoading}
                color='primary'
                variant="contained"
              >
                {isLoading ? "Carregando..." : "Entrar"}
              </Styled.Button>
            </Styled.Form>
            <Styled.LinkHeader to="/register">
              REGISTRAR-SE
            </Styled.LinkHeader>
          </Styled.Content>
        </Styled.Container>
      </Layout>
    </>
  )
}

export default Login