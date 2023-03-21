export const api = "http://localhost:8080/api";

export const requestConfig = (method, data, token = null) => {
  console.log(method, data, token);
  let config
  
  if(method === "DELETE") {
    config = {
      method: method,
      headers: {},
    }

  }else {
    config = {
      method, 
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      }
    }
  }

  if(token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
}

