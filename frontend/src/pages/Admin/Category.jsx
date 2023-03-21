import React, { useState, useEffect, useRef } from 'react'
import Layout from '../../components/Layout';
import MenuDashboard from '../../components/MenuDashboard';
import  { useNavigate } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { getCategories } from '../../slices/category';
import { register, reset } from '../../slices/category';

const Category = () => {
  const [name, setName] = useState("");

  const dispatch = useDispatch();

  const { categories, isError } = useSelector(state => state.category);

  useEffect(() => {
    dispatch(getCategories());
  },[dispatch]);


  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(register(name));
    
    setName('');

  }

  const error = (isError) => {
    if(isError) {
      return <p className='text-danger'>{isError}</p>
    }
  }

  return (
    <Layout>
      <div className="container justify-content-center mt-3">
        <div>
          <form onSubmit={handleSubmit}>
            <label htmlFor="">
              <input 
                type="text"
                placeholder="Nome da categoria"
                name="name"
                value={name || ''}
                onChange={(e) => setName(e.target.value)} 
              />
            </label>
            <input type="submit" value="cadastrar" />
          </form>

        </div>
      </div>
        <div className="d-flex">
          <div className='me-5 '>
            <MenuDashboard />
          </div>
        {error(isError)}
        <div className="m-1 w-75">
          <select 
              placeholder="Selecione uma categoria"
              className="form-select mb-3"
              
            >
              {categories && categories.map(cat => (
                <option key={cat._id}>
                  {cat.name}
                </option>      
                ))
              }
            </select>
          </div>
        </div>
    </Layout>
  )
}

export default Category