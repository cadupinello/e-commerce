import React, { useState, useEffect} from 'react'
import Layout from '../../components/Layout'

// reducer login user
import { useDispatch, useSelector } from 'react-redux';

import { login, reset } from '../../slices/Auth'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch();

  const { isLoading, isError } = useSelector(state => state.auth);

  const handleSubmit = (e) => {
    e.preventDefault()
    
    const user = {
      email,
      password,
    };

    dispatch(login(user))

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
          <h3 className='m-3 title'>E-Commerce</h3>
          <h3 className='subtitle'>Faça Login</h3>
          <form onSubmit={handleSubmit} className='form-control' style={{maxWidth: "500px"}}>
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
            {messageError(isError)}
            {!isLoading ? <button type="submit" msg="Cadastrar" color="info" /> : 
            <button disabled msg="Cadastrando..." color="info" />
            }
          </form>
        </div>
      </Layout>
    </>
  )
}

export default Login