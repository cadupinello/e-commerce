import styled from "styled-components";

export const Container = styled("div")({
  width: "100%",
  height: "100vh",
  display: "flex",
  flexDirection: "column",
  padding: "20px",
  backgroundColor: "#fff",

  h4: {
    fontSize: "24px",
    color: "#000",
  },

  span: {
    fontSize: "14px",
    color: "#a1a1aa",
  },

  hr: {
    width: "100%",
    height: "0.5px",
    border: "none",
    backgroundColor: "#a1a1aa",
  }
})

export const Content = styled('div')({
  width: '100%',
  height: '100%',
  display: 'flex',
  gap: '40px',

  "div.main": {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  }
})
