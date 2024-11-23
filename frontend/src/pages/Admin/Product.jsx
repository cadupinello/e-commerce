import React, { useState, useEffect } from 'react'
import Layout from '../../components/layout';
import MenuDashboard from '../../components/menuDashboard';
import { useDispatch, useSelector } from 'react-redux';
import { getCategories } from '../../slices/category';
import { registerProduct, resetMessage } from '../../slices/Product';
import { Select } from 'antd';
const { Option } = Select;
import { useNavigate } from 'react-router-dom';

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
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <MenuDashboard />
          </div>
          <div className="col-md-9">
            <h1>Criar Produtos</h1>
            <div className="m-1 w-75">
              <Select
                bordered={false}
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
              <div className="mb-3">
                <label className="btn btn-outline-secondary col-md-12">
                  {photo ? photo.name : "Escolha uma foto"}
                  <input
                    type="file"
                    name="photo"
                    accept="image/*"
                    onChange={(e) => setPhoto(e.target.files[0])}
                    hidden
                  />
                </label>
              </div>
              <div className="mb-3">
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
              <div className="mb-3">
                <input
                  type="text"
                  value={name}
                  placeholder="Nome do produto"
                  className='form-control'
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <textarea
                  type="text"
                  value={description}
                  placeholder="Descrição do produto"
                  className='form-control'
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <input
                  type="number"
                  value={price}
                  placeholder="Preço do produto"
                  className='form-control'
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <input
                  type="number"
                  value={quantity}
                  placeholder="Quantidade do produto"
                  className='form-control'
                  onChange={(e) => setQuantity(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <Select
                  bordered={false}
                  placeholder="Selecione o estado do produto"
                  size="large"
                  showSearch
                  className="form-select mb-3"
                  onChange={(value) => setShipping(value)}
                >
                  <Option value={true}>Ativo</Option>
                  <Option value={false}>Inativo</Option>
                </Select>
              </div>
              <div className="mb-3">
                {!isError ? (
                  <p className='text-success'>{message}</p>
                ) : (
                  <p className='text-danger'>{message}</p>
                )
                }
                {isLoading ? (
                  <button className='btn btn-primary' disabled>Cadastrando...</button>
                ) : (
                  <button type='submit' className='btn btn-outline-primary' onClick={handleCreate}>Cadastrar</button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Product