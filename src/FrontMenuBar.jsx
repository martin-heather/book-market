import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import styled from 'styled-components';
import { Header } from './StyledComponents/Header.jsx';
import { MenuLink } from './StyledComponents/MenuLink.jsx';

const MenuWrapper = styled(Header)`
  display: flex;
  justify-content: space-between;
  background-image: linear-gradient(
    0deg,
    rgba(0, 44, 89, 1),
    rgba(0, 44, 89, 0.9)
  );
`;

function FrontMenuBar(props) {
  return (
    <MenuWrapper>
      <div>&nbsp;</div>
    </MenuWrapper>
  );
}

function handleLogout(dispatch) {
  fetch('/logout', { method: 'POST', credentials: 'same-origin' });
  dispatch({ type: 'LOGOUT' });
}
const mapDispatchToProps = dispatch => ({
  setLogout: () => handleLogout(dispatch),
});

export default connect(
  null,
  mapDispatchToProps
)(FrontMenuBar);
