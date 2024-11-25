import React, { useState, useEffect, useRef } from 'react'
import { Modal } from 'antd'

import Layout from '../../components/layout';
import MenuDashboard from '../../components/menuDashboard';
import * as Styled from './styled'
import { Button, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material'

import { useDispatch, useSelector } from 'react-redux';
import { getCategories, register, update, deleteCategory, resetMessage } from '../../slices/category';
import Form from '../../components/form';

const Category = () => {
  const [categoryName, setCategoryName] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [selected, setSelected] = useState({
    _id: "",
    name: ""
  });

  const dispatch = useDispatch();

  const { categories, isError, message, isLoading } = useSelector(state => state.category);

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  const resetComponentMessage = () => {
    setTimeout(() => {
      dispatch(resetMessage());
    }, 2000);
  }


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

    } catch (error) {
      console.log(error);
    }
  }

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
      <Styled.Container>
        <h4>Painel Administrativo</h4>
        <span>Gerencie seus produtos e categorias, além de visualizar seus dados pessoais</span>
        <hr />
        <Styled.Content>
          <MenuDashboard />
          <div className='main'>
            <h4>Adicionar nova categoria</h4>
            <Form
              handleSubmit={handleSubmit}
              value={categoryName}
              setValue={setCategoryName}
              placeholder="Nome da categoria"
            />
            {isLoading && <p>Carregando...</p>}
            {message &&
              <p>{message}</p>
            }
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Nome</TableCell>
                  <TableCell>Ações</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {categories?.map((category) => (
                  <TableRow key={category._id}>
                    <TableCell>{category.name}</TableCell>
                    <TableCell>
                      <Button
                        style={{ marginRight: 10 }}
                        variant='outlined'
                        size='small'
                        color='primary'
                        onClick={() => showModal(category)}
                      >
                        Editar
                      </Button>
                      <Button
                        variant='outlined'
                        size='small'
                        color='error'
                        onClick={() => handleDelete(category._id)}
                      >
                        Excluir
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
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
                  style={{ marginRight: 10 }}
                  value={selected.name}
                  onChange={(e) => setSelected({ ...selected, name: e.target.value })}
                />
                <input type="submit" value="Atualizar" className='btn btn-outline-secondary' />
              </form>
            </Modal>
          </div>
        </Styled.Content>
      </Styled.Container>
    </Layout>
  )
}

export default Category