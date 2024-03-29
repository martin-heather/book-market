import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const MenuLink = styled(Link)`
  padding: 10px;
  color: var(--paper-grey);
  text-decoration: none;
  text-shadow: 0px 0px 0px #4d7baa;
  transition: 0.3s;
  :hover {
    text-shadow: 0 0 2px #4d7baa, 0 0 18px #f2f8ff;
  }
`;
