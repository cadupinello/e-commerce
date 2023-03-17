import styled from 'styled-components'

export const Container = styled.div`
  max-width: 800px;
  display: flex;
  align-items: center;
  margin: 0 auto;
  margin-top: 50px;
`;

export const Box = styled.div`
  width: 45%;
  margin: 0 auto;
  padding: 20px;
  display: flex;
  flex-direction: column;
`;

export const BoxContent = styled.div`
  width: 45%;
  margin: 0 auto;
  padding: 20px;
  display: flex;
  border: 1px solid #333;
  flex-direction: column;
`;

export const Content = styled.div`
  display: flex;
  padding: 0.5rem;
  margin-bottom: 20px;
`;

export const Title = styled.h1`
  font-size: 18px;
  text-align: center;
  `;

export const SubTitle = styled.h2`
  font-size: 16px;
  margin-right: 10px;
`;

export const Text = styled.p`
  font-size: 14px;
`;