import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import styled from 'styled-components';
import { Left, Right } from './StyledComponents/Divs.jsx';
import { Button } from './StyledComponents/Buttons.jsx';
import { ItemCard } from './StyledComponents/ItemCard.jsx';

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
      sortBy: 'Default',
    };
  }

  async componentDidMount() {
    const response = await fetch('/inventory');
    const body = await response.json();
    if (body.success) {
      this.props.handleLoadInventory(body);
    }
  }

  handleSortByAuthor = evt => {
    this.setState({ sortBy: evt.target.value });
    if (this.state.sortBy === 'Author') {
      //ALPHA BY AUTHOR:
      // const alphabeticAuthorArray = inventory.map(item => item.author).sort();
      // const booksByAuthor = alphabeticAuthorArray.map(author => inventory.filter(book => book.author == author)[0]);
    } else if (this.state.sortBy === 'Price') {
      //CHEAPEST 1ST:
      // const priceArray = inventory.map(item => item.price).sort(function(a, b){return a - b});
      // const booksByPrice = priceArray.map(price => inventory.filter(book => book.price == price)[0]);
    } else if (this.state.sortBy === 'Newest First') {
      //MOST RECENT:
      // const reverseChronologicalArray = inventory.map(item => item.timeAdded).sort(function(a, b){return b - a})
      // const booksByRecentness = reverseChronologicalArray.map(timeAdded => inventory.filter(book => book.timeAdded == timeAdded)[0]);
    }
  };

  render() {
    console.log('this.props: ', this.props);
    const searchResults = this.props.inventory.filter(item =>
      item.title.toLowerCase().includes(this.props.query.toLowerCase())
    );

    let inventoryCards = item => (
      <ItemCard key={item.id}>
        <Link to={`/item/${item.id}`}>
          <img src={item.imagePath} />
        </Link>
        <div>
          <strong>{item.title}</strong>
        </div>
        <div>
          by{' '}
          {item.author
            .split(',')
            .reverse()
            .join(' ')}
        </div>
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
              <strong>Search Books: </strong>
              <input
                type="text"
                onChange={this.props.handleQueryChange}
                value={this.props.query}
              />
            </SearchDiv>
          </Left>
          <Right>
            <SortDiv>
              <form>
                <strong>Sort by</strong>{' '}
                <label>
                  <select
                    type="text"
                    onChange={this.handleSortChange}
                    value={this.state.sortBy}
                  >
                    <option default disabled hidden>
                      Select One
                    </option>
                    <option>Author</option>
                    <option>Price</option>
                    <option>Newest First</option>
                  </select>
                </label>{' '}
                <button className="form-button">Submit</button>
              </form>
            </SortDiv>
          </Right>
        </FindWrapper>

        <div className="ItemCards">{searchResults.map(inventoryCards)}</div>
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    inventory: state.allInventory,
    userProfiles: state.allUserProfiles,
    lgin: state.loggedIn,
    query: state.query,
  };
};

const mapDispatchToProps = dispatch => ({
  handleQueryChange: evt =>
    dispatch({ type: 'SET_QUERY', query: evt.target.value }),
  handleLoadInventory: body =>
    dispatch({ type: 'LOAD_INVENTORY', inventory: body.inventory }),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
