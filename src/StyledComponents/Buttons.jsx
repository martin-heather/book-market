import styled from 'styled-components';

export const Button = styled.button`
  margin: 10px auto;
  background-color: #002c59;
  color: #e4e4e4;
  font-family: 'Arbutus Slab', serif;
  font-size: .75rem;
  padding: 7px;
  border: 1px solid #002c59;
  border-radius: 4px;
  outline-width: 0;
  -webkit-transition-duration: 0.4s; /* Safari */
  transition-duration: 0.4s;
  :hover {
  transform: scale(1.05);
  box-shadow: 3px 3px 5px 0px rgba(50, 50, 50, 0.75);
}
:active {
  transform: scale(1);
  box-shadow: 3px 3px 5px 0px rgba(50, 50, 50, 0);
}
`;

export const GhostButton = styled(Button)`
  background-color: #e4e4e4;
  color: #002c59;
  
`;

export const Input = styled.input`
  padding: 7px;
  font-family: 'Arbutus Slab', serif;
  color: #002c59;
  font-size: .75rem;
  border: 1px solid #002c59;
  border-radius: 4px;
  outline-width: 0;
`;
