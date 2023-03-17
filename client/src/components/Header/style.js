import styled from 'styled-components';
import { NavLink, Link } from 'react-router-dom';

export const Navbar = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 10vh;
  border-bottom: 1px solid #333;
`;

export const Logo = styled(Link)`
  width: 10%;
  margin-left: 2rem;
  font-size: 1.2rem;
  font-weight: bold;
  color: #2596be;
  text-align: left;
  text-decoration: none;
  cursor: pointer;

  &:hover {
    font-size: 1.3rem;
    transition: 0.5s;
  }
`;

export const Span = styled.span`
  color: #2596be;
  font-weight: bold;
  font-size: 1rem;
  width: fit-content;
  margin-right: 2rem;
  text-align: right;
  cursor: pointer;  
`;

export const NavMenu = styled.div`
  display: flex;
  align-items: center;
  width: 90%;
  justify-content: center;
`;

export const Ul = styled.ul`
  list-style: none;
  display: flex;
  align-items: center;
  padding: 0;
  gap: 2rem;
`;

export const Li = styled.li`
  list-style: none;
  margin-right: 1rem;
  cursor: pointer;
`;

export const NavItem = styled(Link)`
  position: relative;
  display: inline-block;
  font-size: 1rem;
  font-weight: 600;
  color: #f2f2f2;
  text-decoration: none;
  cursor: pointer;

  &::before {
    content: "";
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 2px;
    background-color: #f2f2f2;
    border-radius: 4px;
    scale: 0 1;
    transform-origin: left;
    transition: scale 0.25s;
  },

  &:hover::before {
    scale: 1;
  }
`;
