import React, { Component } from 'react';
import { connect } from 'react-redux';

import styled from 'styled-components';
import { ItemDetailCard, DetailDiv } from './StyledComponents/ItemDetailCard.jsx';
import { Button, GhostButton } from './StyledComponents/Buttons.jsx';

const Desc = styled.div`
  font-size: .75rem;
  text-align: left;
  padding: 15px;
`;

class ItemDetails extends Component {
  constructor(props) {
    super(props);
};

render = () => {  
  let item = this.props.itemObject;
        return ( 
      <ItemDetailCard>
        <DetailDiv>
          <img src={item.imagePath} />
          
        </DetailDiv>
        <DetailDiv >
        <div><strong>{item.title}</strong></div>
          <div>by{' '}{item.author.split(",").reverse().join(' ')}</div>        
          <div>${item.price}</div>
          <Button>Add to Cart</Button>{' '}
          <GhostButton>Add to Wish List</GhostButton>
          <Desc>{item.desc}</Desc>
        </DetailDiv>
      </ItemDetailCard>  
      );
  };
};

    
const mapStateToProps = (state, props) => {
  return { 
    inventory: state.allInventory,  
    lgin: state.loggedIn,
  };
};

export default connect(mapStateToProps)(ItemDetails);