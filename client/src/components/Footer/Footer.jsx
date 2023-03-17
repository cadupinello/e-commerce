import React from 'react'

// styled components
import * as C from './style.js'

const Footer = () => {
  return (
    <>
      <C.Footer>
        <C.Title>
          &copy; {new Date().getFullYear()}
        </C.Title>
        <C.Box>
              <C.Links to="/about">About</C.Links> |
        
              <C.Links to="/contact">Contact </C.Links> |
        
              <C.Links to="/policy">Privacy Policy</C.Links>
        </C.Box>
      </C.Footer>
    </>
  )
}

export default Footer