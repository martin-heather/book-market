import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import styled from 'styled-components';
import { Header } from './StyledComponents/Header.jsx';
import { MenuLink } from './StyledComponents/MenuLink.jsx';
import { Left, Right } from './StyledComponents/Divs.jsx';

const MenuWrapper = styled(Header)`
  display: flex;
  justify-content: space-between;
  background-image: linear-gradient(0deg, rgba(0, 44, 89, 1), rgba(0, 44, 89, 0.9));
  `;

function MenuBar(props) {
    const { setLogout, handleQueryChange, query } = props;
    return (
      <MenuWrapper>
        <Left>
          <MenuLink to="/">Home</MenuLink>
        </Left>
        <Right>
        Search Books: <input type="text" onChange={handleQueryChange} value={query} />
          <MenuLink to="/">Sell a Book</MenuLink>
          <MenuLink to="/">Wish List</MenuLink>
          <MenuLink to="/">Shopping Cart</MenuLink>
          <MenuLink to="/" onClick={setLogout}>Logout</MenuLink>
        </Right>
      </MenuWrapper>
    );
  }

  function handleLogout(dispatch) {
    fetch('/logout', { method: 'POST', credentials: 'same-origin' });
    dispatch({ type: 'LOGOUT' });
  }

  const mapStateToProps = (state) => ({
    query: state.query,
  });

  const mapDispatchToProps = (dispatch) => ({
    setLogout: () => handleLogout(dispatch),
    handleQueryChange: (evt) =>
      dispatch({ type: 'SET_QUERY', query: evt.target.value }),
  });
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(MenuBar);

