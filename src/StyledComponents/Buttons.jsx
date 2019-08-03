import styled from 'styled-components';

export const Button = styled.button`
  margin: 20px auto;
  width: 40%;
  background-color: #002c59;
  color: #e4e4e4;
  font-family: 'Arbutus Slab', serif;
  font-size: .75rem;
  padding: 10px;
  border: 0;
  border-radius: 4px;
`;

export const GhostButton = styled(Button)`
  background-color: #e4e4e4;
  color: #002c59;
  border: 1px solid #002c59;
`;