import React, { useState, useEffect, useRef } from 'react'
import { Modal } from 'antd'

import Layout from '../../components/Layout';
import MenuDashboard from '../../components/MenuDashboard';
import  { useNavigate } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { getCategories, register, update, deleteCategory, resetMessage } from '../../slices/category';
import Form from '../../components/Form';

const Category = () => {
  const [categoryName, setCategoryName] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [selected, setSelected] = useState({
    _id: "",
    name: ""
  });

  const { user } = useSelector((state) => state.auth);
 
  const dispatch = useDispatch();

  const { categories, isError, message } = useSelector(state => state.category);

  // get all categories
  useEffect(() => {
    dispatch(getCategories());
  },[ dispatch ]);

  const resetComponentMessage = () => {
    setTimeout(() => {
      dispatch(resetMessage());
    }, 2000);
  }


  // create new category
  const handleSubmit = (e) => {
    e.preventDefault();

   try {
    const data = {
      name: categoryName
    }

    data.JSON = JSON.stringify(data);

    dispatch(register(data));

    setCategoryName("");

    resetComponentMessage();

   }catch(error) {
    console.log(error);
   }
  }

  // update category
  const handleUpdate = (e) => {
    e.preventDefault();

    try {
      const data = {
        name: selected.name,
        id: selected._id
      }

      data.JSON = JSON.stringify(data);

      dispatch(update(data));

      setIsVisible(false);
    
    } catch (error) {
      console.log(error);
    }
  }

  const handleDelete = (id) => {
    dispatch(deleteCategory(id));

    resetComponentMessage();
  }

  // modal
  const showModal = (category) => {
    setIsVisible(true);
    setSelected(category);
  }

  const handleOk = () => {
    setIsVisible(false);
  }

  const handleCancel = () => {
    setIsVisible(false);
  }

  return (
    <Layout>
      <div className="container-fluid m-3 p-3 dashboard">
        <div className="row">
        <div className='col-md-3'>
          <MenuDashboard />
        </div>  
        <div className='col-md-9'>
          <h1>Adicionar nova categoria</h1>
        <div className='p-3 w-50'>
          <Form 
            handleSubmit={handleSubmit}
            value={categoryName}
            setValue={setCategoryName}
            placeholder="Nome da categoria"
          />
          {message && 
            <p>{message}</p>
          }
        </div>  
        <div className="w-75">
        <table className='table'>
            <thead>
              <tr>
                <th scope='col'>Nome</th>
                <th scope='col'>Ações</th>
              </tr>
            </thead>
            <tbody>
              {categories?.map((category) => (
                <tr key={category._id}>
                  <td>{category.name}</td>
                  <td>
                    <button 
                      className='btn btn-outline-primary btn-sm me-2'
                      onClick={() => showModal(category)}
                      >
                      Editar
                    </button>
                    <button 
                      className='btn btn-outline-danger btn-sm'
                      onClick={() => handleDelete(category._id)}
                    >
                      Excluir
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Modal
            title="Editar categoria"
            open={isVisible}
            onOk={handleOk}
            onCancel={handleCancel}
          >
            <form 
              onSubmit={handleUpdate}
              className="input-group mb-3"
            >
              <input type="text"
                className='form-control'
                value={selected.name}
                onChange={(e) => setSelected({...selected, name: e.target.value})}
              />
              <input type="submit" value="Atualizar" className='btn btn-outline-secondary' />
            </form>
          </Modal>
        </div>
      </div>
      </div>
    </Layout>
  )
}

export default Category