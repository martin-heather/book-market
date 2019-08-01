import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import styled from 'styled-components';
import { Header } from './StyledComponents/Header.jsx';

const HeaderWrapper = styled(Header)`
  display: grid;
  align-items: center;
  background-image: linear-gradient(0deg, rgba(0, 44, 89, 0.9), rgba(0, 44, 89, 0.75));
`;

function PageHeader() {
    return (
      <HeaderWrapper>
          <div className="LogoShrinks">Alibay</div>
      </HeaderWrapper>
    );
  }
  
  export default connect( 
  )(PageHeader);