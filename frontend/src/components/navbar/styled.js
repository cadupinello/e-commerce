import styled from "styled-components";
import { Link, NavLink } from "react-router-dom";
import { OutlinedInput } from "@mui/material";

export const Nav = styled("nav")({
  width: "100%",
  height: "fit-content",
  display: "flex",
  justifyContent: "space-between",
  padding: "24px",
  boxShadow: 'none',
  backgroundColor: '#032839',
  color: '#fff',

  ul: {
    width: "30%",
    height: "fit-content",
    display: "flex",
    justifyContent: "flex-end",
  },

  li: {
    height: "fit-content",
    listStyle: "none",
    marginLeft: "1rem",
    cursor: "pointer",

    a: {
      textDecoration: "none",
      color: "#fff",
    },
  },
})

export const Logo = styled(Link)({
  textDecoration: "none",
  color: "#fff",
  fontWeight: "bold",
  fontSize: "20px",

  "&:hover": {
    color: "#fff",
    textDecoration: "none",
    cursor: "pointer",
  },
})

export const Input = styled(OutlinedInput)({
  width: '100%',
  height: '35px',
  marginBottom: '1rem',
  border: 'none',
  background: '#0d383f',
  color: '#fff',

  '&:focus': {
    border: 'none',
    background: '#0d383f',
    color: '#fff'
  }
})

export const NavItem = styled(NavLink)({
  textDecoration: "none",
  color: "#fff",

  "svg": {
    fontSize: "20px",
  }
})

export const Logout = styled('button')({
  marginLeft: '1rem',
  height: 'fit-content',
  border: 'none',
  background: 'none',
  color: '#fff',
  cursor: 'pointer'
})