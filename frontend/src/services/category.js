import { api, requestConfig } from '../utils/Config';

export const getCategories = async () => {
  const config = requestConfig("GET");

  try {
    const res = await fetch(`${api}/category/get-categories`, config)
    .then(res => res.json())
    .catch(err => console.log(err));

    return res;

  }catch(err) {
    console.log(err);
  }
}

export const registerCategories = async (data, token) => {
  const config = requestConfig("POST", data, token);

    try {

      const res = await fetch(`${api}/category/create-category`, config)
      .then(res => res.json())
      .catch(err => console.log(err));
  
      return res;
      
    }catch(error){
      console.log(error)
    }
}


export const updateCategories = async (data, token) => {
  const config = requestConfig("PUT", data, token);
  try {
    const res = await fetch(`${api}/category/update-category/${data.id}`, config)
    .then(res => res.json())
    .catch(err => console.log(err));
    
    return res;

  }catch(error){
    console.log(error)
  }
}

export const deleteCategories = async (id, token) => {
  console.log(id, token)
  const config = requestConfig("DELETE", id, token);
  try {
    const res = await fetch(`${api}/category/delete-category/${id}`, config)
    .then(res => res.json())
    .catch(err => console.log(err));
    
    return res;

  }catch(error){
    console.log(error)
  }
}

const categoryServices = {
  getCategories,
  registerCategories,
  updateCategories,
  deleteCategories
}

export default categoryServices;