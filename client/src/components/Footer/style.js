import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Footer = styled.footer`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 10vh;
  background-color: #262626;
  border-top: 1px solid #333;
`;

export const Title = styled.h1`
  font-size: 16px;
  color: #f2f2f2;
  font-weight: bold;
  padding-top: 20px;
`;

export const Box = styled.div`
  display: flex;
  padding: 10px;
`;

export const Links = styled(Link)`
  text-decoration: none;
  color: #f2f2f2;
  font-size: 14px;
  margin: 0 10px;

  &:hover {
    font-weight: bold;
  }
`;

