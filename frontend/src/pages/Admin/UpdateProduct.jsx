import React, {useState, useEffect} from 'react'
import Layout from '../../components/Layout';
import MenuDashboard from '../../components/MenuDashboard';
import { useDispatch, useSelector } from 'react-redux';
import { getSingleProducts, updateProduct, deleteProduct, resetMessage } from '../../slices/Product';
import { Select } from 'antd';
const { Option } = Select;
import { useNavigate, useParams } from 'react-router-dom';
import { api } from '../../utils/Config';
import axios from 'axios';
import { getCategories } from '../../slices/category';

const UpdateProduct = () => {
  const params = useParams();
  const [id, setId] = useState();
  const [category, setCategory] = useState();
  const [name, setName] = useState();
  const [description, setDescription] = useState();
  const [price, setPrice] = useState();
  const [quantity, setQuantity] = useState();
  const [photo, setPhoto] = useState();
  const [shipping, setShipping] = useState();

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const { categories } = useSelector(state => state.category);
  const { singleProduct, message, isError, isLoading, isSuccess } = useSelector(state => state.product);

  // get all categories
  useEffect(() => {
    dispatch(getSingleProducts(`${params.slug}`));
    dispatch(getCategories());
  },[dispatch, params.slug]);

  const resetComponentMessage = () => {
    setTimeout(() => {
      return dispatch(resetMessage());
    }, 2000);
  }

  const handleUpdate = async (e) => {
    e.preventDefault();
    
    try {

      const formdata = new FormData();
      formdata.append('id', id);
      formdata.append('name', name);
      formdata.append('description', description);
      formdata.append('price', price);
      formdata.append('quantity', quantity);
      formdata.append('category', category);
      photo && formdata.append('photo', photo);
      formdata.append('shipping', shipping);


      resetComponentMessage();

      console.log(formdata, id);
      dispatch(updateProduct(formdata));
  
    }catch(error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (singleProduct) {
      setId(singleProduct._id);
      setName(singleProduct.name);
      setDescription(singleProduct.description);
      setPrice(singleProduct.price);
      setQuantity(singleProduct.quantity);
      setShipping(singleProduct.shipping);
    }

    if(singleProduct && singleProduct.category) {
      setCategory(singleProduct.category.name);
    }
  }, [singleProduct]);
  
  const handleDelete = async (id) => {
    try {
      let answer = window.confirm("Deseja realmente excluir este produto?");
      if(!answer) return;
      dispatch(deleteProduct(id));

      navigate('/dashboard/admin/all-products');

      resetComponentMessage();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      {isLoading ? 
      (
        <h1>Loading...</h1>
      ) : (
    <Layout>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <MenuDashboard />
          </div>
          <div className="col-md-9">
            <h1>Atualizar Produtos</h1>
            <div className="m-1 w-75">
              <Select
                required
                bordered={false}
                size="large"
                showSearch
                className="form-select mb-3"
                onChange={(value) => setCategory(value)}
                value={category || ""}
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
                {photo ? (
                  <div className="text-center">
                    <img 
                      src={URL.createObjectURL(photo) || ""}
                      alt="foto do produto" 
                      height={"200px"}
                      className="img img-responsive"   
                    />
                  </div>
                ) : (
                  <div className="text-center">
                    <img 
                      src={`${api}/product/product-photo/${id}` || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"}
                      alt="foto do produto" 
                      height={"200px"}
                      className="img img-responsive"   
                    />
                  </div>
                )
              
              }
              </div>
              <div className="mb-3">
                <input 
                  type="text" 
                  placeholder="Nome do produto"
                  className='form-control'
                  onChange={(e) => setName(e.target.value)} 
                  value={name || ""}
                />
              </div>
              <div className="mb-3">
                <textarea 
                  type="text" 
                  placeholder="Descrição do produto"
                  className='form-control'
                  onChange={(e) => setDescription(e.target.value)}
                  value={description || ""}
                />
              </div>
              <div className="mb-3">
                <input 
                  type="number" 
                  placeholder="Preço do produto"
                  className='form-control'
                  onChange={(e) => setPrice(e.target.value)} 
                  value={price || ""}
                />
              </div>
              <div className="mb-3">
                <input 
                  type="number" 
                  placeholder="Quantidade do produto"
                  className='form-control'
                  onChange={(e) => setQuantity(e.target.value)} 
                  value={quantity || ""}
                />
              </div>
              <div className="mb-3">
                <Select
                  required
                  bordered={false}
                  placeholder="Opção de entrega"
                  size="large"
                  showSearch
                  className="form-select mb-3"
                  onChange={(value) => setShipping(value)}
                  value={shipping ? "Sim" : "Não"}
                >
                  <Option value="0">Não</Option>
                  <Option value="1">Sim</Option>
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
                  <button className='btn btn-primary me-2' disabled>Atualizando...</button>
                ) : (
                  <button type='submit' className='btn btn-outline-primary me-2' onClick={handleUpdate}>Atualizar</button>
                )}
                {isLoading ? (
                  <button className='btn btn-danger' disabled>Deletando...</button>
                ) : (
                  <button type='submit' className='btn btn-outline-danger' onClick={() => handleDelete(id)}>Deletar</button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
    )}
    </>
  )
}

export default UpdateProduct