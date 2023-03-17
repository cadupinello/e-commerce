import styled from 'styled-components'
import { NavLink } from 'react-router-dom';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Box = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

export const Title = styled.h1`
  font-size: 1.5rem;
`;

export const NavLinks = styled(NavLink)`
  text-decoration: none;
  color: #f2f2f2;
  font-size: 1rem;
  padding: 0.5rem;
  margin: 0.5rem;
  width: 50%;
  text-align: center;
  border-radius: 2px;
  border: 1px solid #333;

  &:hover {
    border: 1px solid #f2f2f2;
    transition: 0.3s;
  }
`;