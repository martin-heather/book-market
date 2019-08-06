import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router';
import { Link } from 'react-router-dom';

import PageHeader from './PageHeader.jsx';
import MenuBar from './MenuBar.jsx';
import Login from './Login.jsx';
import Signup from './Signup.jsx';
import ItemDetails from './ItemDetails.jsx';
import AddItemForm from './AddItemForm.jsx';
import ShoppingCart from './ShoppingCart.jsx';

import styled from 'styled-components';
import { Left, Right } from './StyledComponents/Divs.jsx';
import { Button, GhostButton, Input } from './StyledComponents/Buttons.jsx';
import { ItemCard } from './StyledComponents/ItemCard.jsx';
import { ItemDetailCard } from './StyledComponents/ItemDetailCard.jsx';

const FindWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  `;

const SearchDiv = styled.div`
  text-align: left;
  font-size: 0.75rem;
  color: rgba(0, 44, 89, 1);
`;

const SortDiv = styled.div`
  text-align: right;
  font-size: 0.75rem;
  color: rgba(0, 44, 89, 1);
`;

class Home extends Component {
  constructor(props) {
        super(props);
        this.state = {
          sortBy: '',
        };
      };

  // componentDidMount() {
  //   this.updateInventory();
  // }

  // updateInventory = async () => {
  //   const response = await fetch('/inventory');
  //   const body = await response.json();
  //     if (body.success) {
  //     this.props.dispatch({ type: 'UPDATE_INVENTORY', newInventory: body.inventory });
  //     } 
  // };

  handleSortChange = (evt) => {
    this.setState({ sortBy: evt.target.value });
    console.log(this.state);
  };

  renderHome = () => {  
    const searchResults = this.props.inventory.filter((item) =>
    item.title.toLowerCase().includes(this.props.query.toLowerCase())
  );

    let inventoryCards = item => (
        <ItemCard key={item.id}>
        <Link to={`/item/${item.id}`}><img src={item.imagePath} /></Link>
        <div><strong>{item.title}</strong></div>
        <div>by{' '}{item.author.split(",").reverse().join(' ')}</div>        
        <div>${item.price}</div>
        <Link to={`/item/${item.id}`}>
          <Button>Item Details</Button>      
        </Link>
      </ItemCard>
    );

    return (
      <>
      <FindWrapper>
      <Left>
        <SearchDiv>
        <strong>Search Books: </strong><input type="text" onChange={this.props.handleQueryChange} value={this.props.query} />
        </SearchDiv>
      </Left>
      <Right>
      <SortDiv>
        <form>
        <strong>Sort by</strong>{' '} 
        <label>
        <select type="text"
        onChange={this.handleSortChange}
        value={this.state.sortBy}>
          <option default disabled hidden>Select One</option>
          <option>Author</option>
          <option>Price</option>
          <option>Newest First</option>            
        </select>
      </label>
       {' '}
       <button className="form-button">
       Submit
     </button>
                </form>
      </SortDiv>
      </Right> 
      </FindWrapper>    

    <div className='ItemCards'>  
          {searchResults.map(inventoryCards)}
      </div>


      </>
    );
  };

renderItemDetails = routerData => {
  let itemId = routerData.match.params.id;
  console.log('itemId: ', itemId);
  console.log(this.props.inventory);

  let inventoryArr = this.props.inventory.filter(item => item.id == itemId);
  console.log(inventoryArr);
  let itemObject = inventoryArr[0];
    console.log('itemObject: ', itemObject);

    return ( 
      <ItemDetails itemObject={itemObject} />
      );
}

renderShoppingCart = routerData => {
    return ( 
      <ShoppingCart />
      );
}

renderAddItem = routerData => {
  return ( 
    <AddItemForm />
    );
}
    
render () {
  return ( 
    <>   
      <Route exact={true} path='/' render={this.renderHome} />
      <Route exact={true} path='/item/:id' render={this.renderItemDetails} />
      <Route exact={true} path='/shoppingcart' render={this.renderShoppingCart} />
      <Route exact={true} path='/additem' render={this.renderAddItem} />
    </>  
    );
  };
};

    
const mapStateToProps = (state, props) => {
  return { 
    inventory: state.allInventory,  
    lgin: state.loggedIn,
    query: state.query };
};

const mapDispatchToProps = (dispatch) => ({
  handleQueryChange: (evt) =>
    dispatch({ type: 'SET_QUERY', query: evt.target.value }),
});

export default connect(mapStateToProps,
  mapDispatchToProps)(Home);