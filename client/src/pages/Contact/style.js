import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;

`;

export const Box = styled.div`
  width: 40%;
  height: 50%;
  margin-right: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  `;

export const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 2px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 1);
`;

export const Title = styled.h1`
  font-size: 50px;
  background: #f2f2f2;
  color: #262626;
  padding: 10px;
  border-radius: 2px;
  width: 80%;
  text-align: center;
`;

export const Content = styled.p`
  font-size: 16px;
  align-self: flex-start;
  margin-left: 40px;

  svg {
    margin-right: 10px;
    color: #f2f2f2;
  }

`;

