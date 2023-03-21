import React, { useState, useEffect} from 'react'
import Button from '../../components/Button'
import Layout from '../../components/Layout'

// reducer register user
import { useDispatch, useSelector } from 'react-redux';

import { register, reset } from '../../slices/Auth'

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

  const messageError = (isError) => {
    if (isError) {
        return (
          <div className="alert alert-danger" role="alert">
            {isError}
          </div>
        )
    }
  }

  return (
    <>
      <Layout>
        <div className='AlignDivs'>
          <h3 className='m-3 title'>Register</h3>
          <h3 className='subtitle'>Crie sua conta</h3>
          <form onSubmit={handleSubmit} className='form-control' style={{maxWidth: "500px"}}>
            <div className='form-group mb-3'>
                <label htmlFor='name'>Nome</label>
                <input 
                  type='text' 
                  id='name' 
                  className='form-control' 
                  placeholder='Digite seu nome' 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
            </div>
            <div className='form-group mb-3 mb-3'>
              <label htmlFor='email'>Email</label>
              <input 
                type='email' 
                id='email' 
                className='form-control' 
                placeholder='Digite seu email' 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className='form-group mb-3'>
              <label htmlFor='password'>Senha</label>
              <input 
                type='password' 
                id='password' 
                className='form-control' 
                placeholder='Digite sua senha' 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className='form-group mb-3'>
              <label htmlFor='telefone'>Telefone</label>
              <input 
                type='text' 
                id='telefone' 
                className='form-control' 
                placeholder='Digite seu telefone' 
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            <div className='form-group mb-3'>
              <label htmlFor='endereco'>Endereço</label>
              <input 
                type='text' 
                id='endereco' 
                className='form-control'
                placeholder='Digite seu endereço'
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
            <div className='form-group mb-3'>
              <label htmlFor='answer'>Pergunta de segurança</label>
              <input 
                type='text'
                id='pergunta' 
                className='form-control' 
                placeholder='Qual é o seu jogo favorito?'
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
              />
            </div>
            {messageError(isError)}
            {!isLoading ? <Button type="submit" msg="Cadastrar" color="info" /> : 
            <Button disabled msg="Cadastrando..." color="info" />
            }
          </form>
        </div>
      </Layout>
    </>
  )
}

export default Register