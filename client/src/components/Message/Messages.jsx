import React from 'react'
import * as C from './style'

const Messages = ({msg, type}) => {
  return (
    <>
      <C.Message type={type}>
       <C.Text>{msg}</C.Text>
      </C.Message>
    </>
  )
}

export default Messages