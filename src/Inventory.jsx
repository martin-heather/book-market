import React, { Component } from 'react';
import { connect } from 'react-redux';
import PageHeader from './PageHeader.jsx';
import MenuBar from './MenuBar.jsx';
import Login from './Login.jsx';
import Signup from './Signup.jsx';
import ItemDetails from './ItemDetails.jsx';
import AddItemForm from './AddItemForm.jsx';
import styled from 'styled-components';
import { ItemCard } from './StyledComponents/ItemCard.jsx';

const SortDiv = styled.div`
  text-align: right;
  font-size: 0.75rem;
  color: rgba(0, 44, 89, 1);
`;

class Inventory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sortBy: '',
    };
  }

  handleSortChange = (evt) => {
    this.setState({ sortBy: evt.target.value });
  };

  render = () => {  
    const searchResults = this.props.inventory.filter((item) =>
    item.title.toLowerCase().includes(this.props.query.toLowerCase())
  );

    let inventoryCards = item => (
        <ItemCard>
        <img src={item.imagePath} /> 
        <div><strong>{item.title}</strong></div>
        <div>by{' '}{item.author}</div>        
        <div>${item.price}</div>
        <button>Item Details</button>
      </ItemCard>
    );

    return ( 
      <>
      <SortDiv>
          <form>
          <strong>Sort by</strong>{' '} 
          <label>
          <select type="text"
          onChange={this.handleSortChange}
          value={this.state.sortBy}>
            <option default disabled hidden>Select One</option>
            <option>Author Name</option>
            <option>Price</option>
            <option>Newest First</option>            
          </select>
        </label>
        <button className="form-button">
        Submit
      </button>
                  </form>
        </SortDiv> 

      <div className='ItemCards'>  
          {searchResults.map(inventoryCards)}
      </div>
    <ItemDetails/>
    <AddItemForm/>
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
export default connect(mapStateToProps)(Inventory);