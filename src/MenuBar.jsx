import React, { Component } from 'react';
import { connect } from 'react-redux';

import styled from 'styled-components';
import { Header } from './StyledComponents/Header.jsx';
import { MenuLink } from './StyledComponents/MenuLink.jsx';
import { Left, Right } from './StyledComponents/Divs.jsx';
import { Input } from './StyledComponents/Buttons.jsx';

const MenuWrapper = styled(Header)`
  display: flex;
  justify-content: space-between;
  background-image: linear-gradient(
    0deg,
    rgba(0, 44, 89, 1),
    rgba(0, 44, 89, 0.9)
  );
`;

function MenuBar(props) {
  const { setLogout } = props;
  return (
    <MenuWrapper>
      <Left>
        <MenuLink to="/">Home</MenuLink>
      </Left>
      <Right>
        <MenuLink to="/additem">Sell a Book</MenuLink>
        <MenuLink to="/">Wish List</MenuLink>
        <MenuLink to="/shoppingcart">Shopping Cart</MenuLink>
        <MenuLink to="/" onClick={setLogout}>
          Logout
        </MenuLink>
      </Right>
    </MenuWrapper>
  );
}

function handleLogout(dispatch) {
  fetch('/logout', { method: 'POST', credentials: 'same-origin' });
  dispatch({ type: 'LOGOUT' });
}

// const mapStateToProps = (state) => ({
//   query: state.query,
// });

const mapDispatchToProps = dispatch => ({
  setLogout: () => handleLogout(dispatch),
});

export default connect(
  null,
  mapDispatchToProps
)(MenuBar);
