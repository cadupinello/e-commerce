import styled from "styled-components";

export const Container = styled("div")({
  width: "100%",
  height: "100vh",
  display: "flex",
  flexDirection: "column",

  "> div": {
    display: "flex",
    height: "100%",
  },
})

export const Main = styled("main")({
  width: "100%",
  height: "100%",
  minHeight: "80vh",
  display: "flex",
  flexDirection: "column",
  padding: "20px",
})