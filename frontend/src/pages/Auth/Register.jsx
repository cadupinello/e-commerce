import React, { useState, useEffect } from 'react'
import Layout from '../../components/layout'

// reducer register user
import { useDispatch, useSelector } from 'react-redux';

import { register, reset } from '../../slices/Auth'

import * as Styled from './styled'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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

  useEffect(() => {
    if (isError) {
      toast.error('Erro ao cadastrar o usuário', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: false,
        progress: undefined,
      });
      dispatch(reset());
    }
  }, [isError, dispatch]);

  return (
    <>
      <Layout>
        <Styled.Container>
          <Styled.Content>
            <h4>Cadastrar</h4>
            <Styled.Form>
              <Styled.FormControl>
                <label htmlFor='name'>Nome</label>
                <Styled.Input
                  type='name'
                  id='name'
                  placeholder='Digite seu nome'
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </Styled.FormControl>
              <Styled.FormControl>
                <label htmlFor='email'>Email</label>
                <Styled.Input
                  type='email'
                  id='email'
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
                  placeholder='Digite sua senha'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Styled.FormControl>
              <Styled.FormContainer>

                <Styled.FormControl>
                  <label htmlFor='phone'>Telefone</label>
                  <Styled.Input
                    type='text'
                    id='phone'
                    placeholder='Digite seu telefone'
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </Styled.FormControl>
                <Styled.FormControl>
                  <label htmlFor='address'>Endereço</label>
                  <Styled.Input
                    type='text'
                    id='address'
                    placeholder='Digite seu endereço'
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </Styled.FormControl>
              </Styled.FormContainer>

              <Styled.FormControl>
                <label htmlFor='answer'>Pergunta de segurança</label>
                <Styled.Input
                  type='text'
                  id='answer'
                  placeholder='Qual é o seu jogo favorito'
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                />
              </Styled.FormControl>
              <Styled.Button
                type="submit"
                onClick={handleSubmit}
                disabled={isLoading}
                color='primary'
                variant="contained"
              >
                {isLoading ? "Carregando..." : "Cadastrar"}
              </Styled.Button>
            </Styled.Form>
            <Styled.LinkHeader to="/login">
              ENTRAR
            </Styled.LinkHeader>
          </Styled.Content>
        </Styled.Container>
      </Layout>
      <ToastContainer />
    </>
  )
}

export default Register