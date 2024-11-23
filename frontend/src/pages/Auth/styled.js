import { OutlinedInput, FormControl as FormControlStyle, Button as ButtonStyle } from "@mui/material";
import { Link } from "react-router-dom";
import styled from "styled-components";

export const Container = styled("div")({
  width: "100%",
  height: "100vh",
  display: "flex",
  justifyContent: "center",
})

export const Content = styled("div")({
  width: "400px",
  height: "fit-content",
  display: "flex",
  flexDirection: "column",
  padding: "20px",
  borderRadius: "5px",
  boxShadow: "0 0 5px rgba(0, 0, 0, 0.1)",

  h4: {
    width: "100%",
    textAlign: "center",
    fontSize: "24px",
    fontWeight: "bold",
    marginBottom: "1rem",
    color: "#000",
  }
})

export const Form = styled("form")({
  width: "100%",
  height: "100%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  margin: "20px 0",
})

export const FormControl = styled(FormControlStyle)({
  width: "100%",
})

export const FormContainer = styled("div")({
  width: "100%",
  height: "100%",
  display: "flex",
  alignItems: "center",
  gap: "15px",
})

export const Input = styled(OutlinedInput)({
  width: "100%",
  height: "32px",
  fontSize: "12px",
  fontWeight: "bold",
  color: "#099ee4",
  border: "1px solid #099ee4",
  backgroundColor: "#fff",
  borderRadius: "4px",
  marginBottom: "20px",
})

export const Button = styled(ButtonStyle)({
  width: "100%",
  height: "32px",
  display: "flex",
  fontSize: "12px",
  boxShadow: "none !important",

  "&:hover": {
    backgroundColor: "#055b81",
    color: "#fff",
    transition: "all 0.3s ease-in-out",
  },
})

export const LinkHeader = styled(Link)({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  textAlign: "center",
  fontSize: "14px",
  fontWeight: "bold",
  marginTop: "1rem",
  color: "#099ee4",
  backgroundColor: "#fff",
  borderRadius: "4px",
  textDecoration: "none",

  "&:hover": {
    color: "#055b81",
    textDecoration: "none",
    transition: "all 0.3s ease-in-out",
  },
})