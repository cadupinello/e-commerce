import styled from 'styled-components'

export const Message = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 2px;
  padding: 0.1rem;
  width: 80%;
  margin: 0.5rem auto;
  height: 2rem;
  font-size: 14px;
  font-weight: 500;
  color: #fff;
  background-color: ${props => props.type === 'success' ? '#5cb85c' : '#d9534f'};
`;

export const Text = styled.p.attrs({
  msg: `${props => props.msg}`,
})`
  position: absolute;
  font-size: 12px;
`;