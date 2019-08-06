import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import styled from 'styled-components';
import { ItemDetailCard, DetailDiv } from './StyledComponents/ItemDetailCard.jsx';
import { ItemCard } from './StyledComponents/ItemCard.jsx';
import { Button, GhostButton } from './StyledComponents/Buttons.jsx';

const Desc = styled.div`
  font-size: .75rem;
  text-align: left;
  padding: 15px;
`;

class ShoppingCart extends Component {
  constructor(props) {
    super(props);


};

populateUserCart = () => {
    const username = this.props.username;
    const userProfileArr = this.props.userProfiles.filter(user => user.name == username);
    console.log('userProfileArr: ', userProfileArr);
    if (userProfileArr.length === 1) {
        console.log(this.props.userProfiles[0]);        
        const userProfile = this.props.userProfiles[0];
        console.log(userProfile.itemsInCart);
        const bookIds = userProfile.itemsInCart;
        //rework logic
        const booksInCart = bookIds.map(id => this.props.inventory.filter(book => book.id === id)[0]);
        console.log(booksInCart);
        return booksInCart.map(item => 
            <ItemCard>
            <Link to={`/item/${item.id}`}><img src={item.imagePath} /></Link>
            <div><strong>{item.title}</strong></div>
            <div>by{' '}{item.author.split(",").reverse().join(' ')}</div>        
            <div>${item.price}</div>
            <Link to={`/item/${item.id}`}>
              <Button>Item Details</Button>      
            </Link>
          </ItemCard>
        ); 
    };   
};

render = () => {  
  let item = this.props.itemObject;
        return ( 
      <ItemDetailCard>
          <>
          {this.props.userProfiles[0].itemsInCart.length > 0 ? this.populateUserCart() : 'You haven\'t added anything to your cart yet.'}
          </>
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

export default connect(mapStateToProps)(ShoppingCart);