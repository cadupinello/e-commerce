export const api = "http://localhost:3001/api";

export const requestConfig = (method, data, token = null) => {
  let config

  if (method === "DELETE") {
    config = {
      method: method,
      headers: {},
    }

  } else {
    config = {
      method,
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      }
    }
  }

  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
}

export const reqConfig = (token) => {
  if (token) {
    return {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  }
}

