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

addToCart = event => {
  event.preventDefault();
  console.log('add to cart: ', event.target.value);
  console.log('shopper: ', this.props.username);
 
  this.props.dispatch({
    type: 'UPDATE_CART',
    itemForCart: event.target.value,
  });
};

addToWishList = event => {
  event.preventDefault();
  console.log('add to wish list: ', event.target.value);
  this.setState({ itemForWishList: event.target.value });
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
          <Button onClick={this.addToCart} value={item.id}>Add to Cart</Button>{' '}
          <GhostButton onClick={this.addToWishList} value={item.id}>Add to Wish List</GhostButton>
          <Desc>{item.desc}</Desc>
        </DetailDiv>
      </ItemDetailCard>  
      );
  };
};

    
const mapStateToProps = (state, props) => {
  return { 
    inventory: state.allInventory, 
    userProfiles: state.allUserProfiles,
    lgin: state.loggedIn,
    username: state.username, 
  };
};

export default connect(mapStateToProps)(ItemDetails);