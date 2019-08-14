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
  color: var(--dark-blue);
`;

const SortDiv = styled.div`
  text-align: right;
  font-size: 0.75rem;
  color: var(--dark-blue);
`;

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sortBy: 'default',
      categories: [],
      loading: true,
    };
  }

  async componentDidMount() {
    const response = await fetch('/inventory');
    const body = await response.json();
    if (body.success) {
      this.props.handleLoadInventory(body);
      console.log(body.inventory);
      this.setState({ sortedInventory: [...body.inventory], loading: false });
      console.log(this.state.sortedInventory);
    }
  }

  handleSortBy = evt => {
    this.setState({
      sortBy: evt.target.value,
    });
  };

  handleCategories = evt => {
    console.log('evt.target: ', evt.target);
    this.setState({
      category: evt.target.value,
    });
    console.log('this.state: ', this.state);
  };

  renderSortedInventory(sortBy) {
    if (sortBy === 'author') {
      //ALPHA BY AUTHOR:
      const alphabeticAuthorArray = this.props.inventory
        .map(item => item.author)
        .sort();
      const booksByAuthor = alphabeticAuthorArray.map(
        author => this.props.inventory.filter(book => book.author == author)[0]
      );
      return booksByAuthor;
    } else if (sortBy === 'price') {
      //CHEAPEST 1ST:
      const priceArray = this.props.inventory
        .map(item => item.price)
        .sort(function(a, b) {
          return a - b;
        });
      const booksByPrice = priceArray.map(
        price => this.props.inventory.filter(book => book.price == price)[0]
      );
      return booksByPrice;
    } else if (sortBy === 'newest') {
      //MOST RECENT:
      const reverseChronologicalArray = this.props.inventory
        .map(item => item.timeAdded)
        .sort(function(a, b) {
          return b - a;
        });
      const booksByRecentness = reverseChronologicalArray.map(
        timeAdded =>
          this.props.inventory.filter(book => book.timeAdded == timeAdded)[0]
      );
      return booksByRecentness;
    }
  }

  renderCategories() {
    let categories = [];
    let items = this.props.inventory;
    for (let i = 0; i < items.length; i++) {
      categories = categories.concat(items[i].categories);
    }

    let eliminateDuplicates = arr => {
      var i,
        len = arr.length,
        out = [],
        obj = {};

      for (i = 0; i < len; i++) {
        obj[arr[i]] = 0;
      }
      for (i in obj) {
        out.push(i);
      }
      return out;
    };

    let categoryList = eliminateDuplicates(categories).sort();

    return (
      <div>
        {categoryList.map(category => (
          <>
            <label className="radio-label" key={category}>
              <input
                type="radio"
                name="category"
                value={category}
                onClick={this.handleCategories}
              />
              &nbsp;{category}
            </label>
            <br />
          </>
        ))}
      </div>
    );
  }

  render() {
    if (this.state.loading) {
      return 'loading';
    }
    console.log('this.props: ', this.props);
    console.log('this.state: ', this.state);
    const sortBy = this.state.sortBy;
    let inventory = this.renderSortedInventory(sortBy) || [
      ...this.props.inventory,
    ];
    console.log(inventory);
    //CATEGORY FILTER
    const category = this.state.category;
    let filter = () => {
      let filteredInventory = inventory.filter(item =>
        item.categories.includes(category)
      );
      let allFilterdInventory = [];
      allFilterdInventory = filteredInventory.map(item => item);
      return allFilterdInventory.flat();
    };
    console.log('filter: ', filter());
    inventory = category ? filter() : inventory;
    console.log('filtered inventory: ', inventory);

    const searchResults = inventory.filter(item =>
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
              <strong>Sort by</strong>{' '}
              <label>
                <select
                  type="text"
                  onChange={this.handleSortBy}
                  value={this.state.sortBy}
                >
                  <option default hidden>
                    Select One
                  </option>
                  <option value="author">Author</option>
                  <option value="price">Price</option>
                  <option value="newest">Newest First</option>
                </select>
              </label>{' '}
            </SortDiv>
          </Right>
        </FindWrapper>
        <div className="home-div">
          <div className="categories-div">
            <strong>Categories</strong> {this.renderCategories()}
          </div>
          <div className="ItemCards">{searchResults.map(inventoryCards)}</div>
        </div>
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
