import { OutlinedInput } from "@mui/material";
import styled from "styled-components";

export const Sidebar = styled('nav')({
  width: '15%',
  height: '100%',
  display: "flex",
  flexDirection: "column",
  padding: "1rem",
  alignItems: "center",
  backgroundColor: "#f2f2f2",

  '> div': {
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",

    h4: {
      width: "100%",
      fontSize: "1.2rem",
      fontWeight: "bold",
      marginBottom: "1rem",
    },

    button: {
      width: "100%",
      height: "32px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      marginBottom: "1rem",
      padding: "0.5rem",
      border: "none",
      borderRadius: "2px",
      backgroundColor: "#0d383f",
      color: "#f4f4f4",
      cursor: "pointer",
    }
  }
})

export const GroupFilter = styled('div')({
  width: '100%',
  height: 'fit-content',
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  marginBottom: '1rem',
})