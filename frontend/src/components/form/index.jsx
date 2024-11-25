import { Button, OutlinedInput } from '@mui/material'
import React from 'react'

const Form = ({ handleSubmit, value, setValue, placeholder }) => {

  return (
    <form onSubmit={handleSubmit} className="input-group mb-3">
      <span className='input-group mb-3'>Item</span>
      <OutlinedInput
        style={{ marginRight: '10px', width: '300px', height: '35px' }}
        type="text"
        placeholder={placeholder}
        value={value || ""}
        onChange={(e) => setValue(e.target.value)}
      />
      <Button
        type="submit"
        variant="contained"
        color="primary"
      >
        Cadastrar
      </Button>
    </form>
  )
}

export default Form