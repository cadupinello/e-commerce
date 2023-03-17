export const api = 'http://localhost:8080/api';

export const requestConfig = (method, data, token = null) => {
  let config

  config = {
    method,
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json'
    }
  }

  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
}
