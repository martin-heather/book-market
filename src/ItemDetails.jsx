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
};
componentDidMount() {
  this.updateInventory();
  
}
updateInventory = async () => {
  const response = await fetch('/inventory');
  const body = await response.json();
  if (body.success) {
    this.props.dispatch({ type: 'UPDATE_INVENTORY', inventory: body.inventory });
  } else {
    this.props.dispatch({ type: 'LOGOUT' });
  }
};

render = () => {  
  let item = this.props.itemObject;
        return ( 
      <ItemDetailCard>
      <div>
          <div>
          <img src={item.imagePath} /> 
          <div><strong>{item.title}</strong></div>
        <div>by{' '}{item.author}</div>        
        <div>${item.price}</div>
        <button>Add to Cart</button>{' '}
        <button>Add to Wish List</button>
          </div>
        <div>
        <Desc>{item.desc}</Desc>
        </div>
     </div>
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