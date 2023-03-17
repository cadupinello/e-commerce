import React from 'react'

import * as C from './style'

const FormLayout = ({children}) => {
  return (
    <C.Container>
      <C.Box>
        {children}
      </C.Box>
    </C.Container>
  )
}

export default FormLayout