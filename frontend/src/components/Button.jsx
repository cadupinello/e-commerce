import React from 'react'
import styled from 'styled-components'

export const Btn = styled.button`
  background-color: ${props => props.color === 'info' ? props.theme.colors.black[600] : props.color === 'success' ? props.theme.colors.green[700] : props.color === 'error' ? props.theme.colors.red[700] : props.color === 'warning' ? props.theme.colors.yellow[900] : props.color === 'primary' ? props.theme.colors.blue[900] : props.themecolors.black[900]};
  color: ${props => props.theme.colors.white[100]};
  border: none;
  border-radius: 3px;
  padding: 0.5rem;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  
  &:hover {
    background-color: ${props => props.color === 'info' ? props.theme.colors.black[900] : 
    props.color === 'success' ? props.theme.colors.green[900] : props.color === 'error' ? props.theme.colors.red[900] : props.color === 'warning' ? props.theme.colors.yellow[900] : props.color === 'primary' ? props.theme.colors.blue[900] : props.theme.colors.black[900]};
    transition: all 0.2s ease-in-out;
  }
`;


const Button = ({msg, type, color}) => {
  
  return (
    <>
      <Btn type={type} color={color}>
        {msg}
      </Btn>
    </>
  )
}

export default Button