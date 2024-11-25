import React, { useState, useEffect } from 'react'
import Layout from '../../components/layout';
import MenuDashboard from '../../components/menuDashboard';
import { useDispatch, useSelector } from 'react-redux';
import { getCategories } from '../../slices/category';
import { registerProduct, resetMessage } from '../../slices/Product';
import { Select } from 'antd';
const { Option } = Select;
import { useNavigate } from 'react-router-dom';
import * as Styled from './styled'
import { Button, FormControl } from '@mui/material';

const Product = () => {
  const [category, setCategory] = useState('');
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [photo, setPhoto] = useState("");
  const [shipping, setShipping] = useState(false);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const { categories } = useSelector(state => state.category);
  const { message, isError, isLoading } = useSelector(state => state.product);

  // get all categories
  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  const resetComponentMessage = () => {
    setTimeout(() => {
      dispatch(resetMessage());
    }, 2000);
  }

  const handleCreate = async (e) => {
    e.preventDefault();

    try {

      const product = {
        name,
        description,
        price,
        quantity,
        category,
        shipping,
      }

      resetComponentMessage();

      dispatch(registerProduct(product));

    } catch (error) {
      console.log(error);
    }

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
            <h4>Criar Produtos</h4>
            <Styled.Form>
              <Select
                placeholder="Selecione uma categoria"
                size="large"
                showSearch
                className="form-select mb-3"
                onChange={(value) => setCategory(value)}
              >
                {categories.map(c => (
                  <Option key={c._id} value={c._id}>
                    {c.name}
                  </Option>
                ))}
              </Select>
              <FormControl>
                <label>
                  {photo ? photo.name : "Escolha uma foto"}
                  <input
                    className='file'
                    type="file"
                    name="photo"
                    accept="image/*"
                    onChange={(e) => setPhoto(e.target.files[0])}
                    hidden
                  />
                </label>
              </FormControl>
              <div>
                {photo && (
                  <div className="text-center">
                    <img
                      src={URL.createObjectURL(photo)}
                      alt="foto do produto"
                      height={"200px"}
                      className="img img-responsive"
                    />
                  </div>
                )}
              </div>
              <FormControl>
                <input
                  type="text"
                  value={name}
                  placeholder="Nome do produto"
                  className='form-control'
                  onChange={(e) => setName(e.target.value)}
                />
              </FormControl>
              <FormControl>
                <textarea
                  type="text"
                  value={description}
                  placeholder="Descrição do produto"
                  className='form-control'
                  onChange={(e) => setDescription(e.target.value)}
                />
              </FormControl>
              <FormControl>
                <input
                  type="number"
                  value={price}
                  placeholder="Preço do produto"
                  className='form-control'
                  onChange={(e) => setPrice(e.target.value)}
                />
              </FormControl>
              <FormControl>
                <input
                  type="number"
                  value={quantity}
                  placeholder="Quantidade do produto"
                  className='form-control'
                  onChange={(e) => setQuantity(e.target.value)}
                />
              </FormControl>
              <FormControl>
                <Select
                  placeholder="Selecione o estado do produto"
                  size="large"
                  showSearch
                  className="form-select mb-3"
                  onChange={(value) => setShipping(value)}
                >
                  <Option value={true}>Ativo</Option>
                  <Option value={false}>Inativo</Option>
                </Select>
              </FormControl>
              <div>
                {!isError ? (
                  <p className='text-success'>{message}</p>
                ) : (
                  <p className='text-danger'>{message}</p>
                )
                }
                <Button
                  variant='contained'
                  color='primary'
                  type='submit'
                  size='medium'
                  disabled={isLoading}
                  onClick={handleCreate}
                >
                  {isLoading ? "Cadastrando..." : "Cadastrar"}
                </Button>
              </div>
            </Styled.Form>
          </div>
        </Styled.Content>
      </Styled.Container>
    </Layout>
  )
}

export default Product