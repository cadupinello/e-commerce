import { api, requestConfig, reqConfig } from '../utils/Config';
import axios from 'axios';

export const getAllProducts = async () => {
  try {
    const res = await axios.get(`${api}/product/get-products`)
    .then(res => res.data)
    .catch(err => err.response.data);

    return res;
  
  }catch(err) {
    console.log(err);
  }
}

export const getSingleProducts = async (slug) => {
  try {
    const res = await axios.get(`${api}/product/get-product/${slug}`)
    .then(res => res.data)
    .catch(err => err.response.data);
  
    return res;

  }catch(err) {
    console.log(err);
  }
}

export const registerProduct = async (data, token) => {
  const config = reqConfig(token);

  try {
    
    const res = await axios.post(`${api}/product/create-product`, data, config)
    .then(res => res.data)
    .catch(err => err.response.data);
    
    return res;
      
    }catch(error){
      console.log(error)
    }
}

export const updateProduct = async (data, token) => {
  const id = data.get('id');
  const config = reqConfig(token);

  try {
    
    const res = await axios.put(`${api}/product/update-product/${id}`, data, config)
    .then(res => res.data)
    .catch(err => err.response.data);

    return res;

  }catch(error){
    console.log(error)
  }
}

export const deleteProduct = async (id, token) => {
  const config = reqConfig(token);
  
  try {
    
    const res = await axios.delete(`${api}/product/delete-product/${id}`, config)
    .then(res => res.data)
    .catch(err => err.response.data);
    
    return res;

  }catch(error){
    console.log(error)
  }
}

export const searchProducts = async (search) => {
  console.log(search)
  try {
    const res = await axios.get(`${api}/product/search?q=${search}`)
    .then(res => res.data)
    .catch(err => err.response.data);
    console.log(res)


    return res;
  }catch(err) {
    console.log(err);
  }
}

export const productServices = {
  registerProduct,
  getAllProducts,
  getSingleProducts,
  updateProduct,
  deleteProduct,
  searchProducts
}

export default productServices;