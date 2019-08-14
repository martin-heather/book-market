import styled from 'styled-components';
import { Header } from './Header.jsx';

export const FormHeader = styled(Header)`
  border-radius: var(--border-radius);
  margin-bottom: 15px;
  font-size: 1.2rem;
  background-image: linear-gradient(
    0deg,
    rgba(0, 44, 89, 0.9),
    rgba(0, 44, 89, 0.75)
  );
`;

export const CartDetailCard = styled.div`
  width: 450px;
  text-align: center;
  color: var(--dark-blue);
  font-size: 1rem;
  margin: 40px auto;
  padding: 20px;
  background-color: #fff;
  border-radius: var(--border-radius);
  box-shadow: 3px 3px 5px 0px rgba(50, 50, 50, 0.75);
`;

export const CartItemCard = styled.div`
  width: 400px;
  font-size: 0.75rem;
  align-content: center;
  display: inline-block;
  margin-right: 0;
`;

export const Desc = styled.div`
  width: 300px;
  font-size: 0.75rem;
  text-align: left;
  padding: 15px 15px 0 15px;
`;

export const CartItem = styled.div`
  display: flex;
  width: 350px;
  font-size: 0.75rem;
  text-align: left;
  padding: 15px 15px 0 15px;
`;

export const CartImage = styled.img`
  max-width: 60px;
  margin: 15px 15px 0 15px;
`;

export const WideDiv = styled.div`
  width: 350px;
  text-align: center;
`;

export const Right = styled.div`
  padding-right: 30px;
  text-align: right;
`;
