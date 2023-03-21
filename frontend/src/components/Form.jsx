import React from 'react'

const Form = ({ handleSubmit, value, setValue, placeholder }) => {
  return (
    <form onSubmit={handleSubmit} className="input-group mb-3">
      <span className='input-group mb-3'>Item</span>
        <input 
          type="text"
          className='form-control'
          placeholder={placeholder}
          value={value || ""}
          onChange={(e) => setValue(e.target.value)} 
        />
      <button type="submit" className='btn btn-outline-primary'>Cadastrar</button>
    </form>
  )
}

export default Form