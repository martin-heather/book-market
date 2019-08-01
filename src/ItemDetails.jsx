import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { ItemDetailCard } from './StyledComponents/ItemDetailCard.jsx';

const Desc = styled.div`
  font-size: .75rem;
  text-align: left;
`;

class ItemDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      itemId: 3,
    };
};

render() { 
    let inventoryArr = this.props.inventory.filter(item => item.id === this.state.itemId);
    let itemObject = inventoryArr[0];   

    return ( 
        <>
      <ItemDetailCard>
          <div>
          <img src={itemObject.imagePath} /> 
          <div><strong>{itemObject.title}</strong></div>
        <div>by{' '}{itemObject.author}</div>        
        <div>${itemObject.price}</div>
        <button>Add to Cart</button>{' '}
        <button>Add to Wish List</button>
          </div>
        <div>
        <Desc>{itemObject.desc}</Desc>
        </div>     
      </ItemDetailCard>
      </>
    );
  };
};
    
const mapStateToProps = (state, props) => {
  return { 
    inventory: state.allInventory,  
    lgin: state.loggedIn };
};

export default connect(mapStateToProps)(ItemDetails);