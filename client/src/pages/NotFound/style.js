import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100%;  
`;

export const Title = styled.h1`
  font-size: 50px;
`;

export const Content = styled.p`
  font-size: 20px;  
`;

export const BtnLink = styled(Link)`
  font-size: 20px;
  text-decoration: none;
  color: black; 
  background-color: #f2f2f2;
  padding: 10px 20px;
  border-radius: 5px;
  margin-top: 20px;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  &:hover {
    background-color: #fff;
  }
`;
