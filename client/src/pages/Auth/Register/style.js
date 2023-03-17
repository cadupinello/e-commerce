import styled from 'styled-components'
import { Link } from 'react-router-dom'

export const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
`;

export const Title = styled.h1`
  font-size: 30px;
  margin-top: 0;
`;

export const SubTitle = styled.h2`
  font-size: 20px;
  margin: 0 0 20px 0;
`;

export const Input = styled.input`
  width: 100%;
  height: 20px;
  padding: 0.5rem;
  margin: 0.5rem;
  border-radius: 2px;
  border: 1px solid #333;
  outline: none;
  font-size: 12px;
  background-color: #262626;
  color: #fff;

  &:focus {
    border: 1px solid #2596be;
    transition: 0.5s;
  }
`;
  
export const InputSubmit = styled.input`
  width: 100%;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0.5rem;
  border-radius: 2px;
  border: none;
  background-color: #f2f2f2;
  font-weight: bold;

  &:hover {
    background-color: #2596be;
    transition: 0.5s;
    color: #f2f2f2;
  }
`;

export const Links = styled(Link)`

`;