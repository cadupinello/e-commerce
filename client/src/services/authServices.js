import { api, requestConfig } from "../utils/config";

// register user
export const register = async (data) => {
    const config = requestConfig("POST", data);
  
  try {
    const res = await fetch(`${api}/auth/register`, config)
    .then(res => res.json())
    .catch(err => err);

    if(res.user._id) {
      localStorage.setItem("user", JSON.stringify(res.user));
    }
    
    return res;
  
  }catch(error){
    console.log(error)
  }
}

export const login = async (data) => {
  const config = requestConfig("POST", data);
  
  try {
    const res = await fetch(`${api}/auth/login`, config)
    .then(res => res.json())
    .catch(err => err);

    if(res.user._id){
      localStorage.setItem("user", JSON.stringify(res));
    }
    
    return res;

  }catch(error){
    console.log(error)
  }
}

export const logout = async () => {
  localStorage.removeItem("user");
}

export const forgotPassword = async (data) => {
  const config = requestConfig("POST", data);
  
  try {
    const res = await fetch(`${api}/forgot-password`, config)
    .then(res => res.json())
    .catch(err => err);
  
  
    return res;

  } catch (error) {
    console.log(error)
  }

}

const authService = {
  register,
  login,
  logout,
  forgotPassword,
}

export default authService;