import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import styled from 'styled-components';
import { ItemDetailCard } from './StyledComponents/ItemDetailCard.jsx';
import { ItemCard } from './StyledComponents/ItemCard.jsx';
import { Button } from './StyledComponents/Buttons.jsx';

const Desc = styled.div`
  font-size: 0.75rem;
  text-align: left;
  padding: 15px;
`;

const ListItem = styled.div`
  display: flex;
  width: 80%;
  font-size: 0.75rem;
  text-align: left;
  padding: 15px;
`;

const ListImage = styled.img`
  max-width: 60px;
  margin: 15px;
`;

class WishList extends Component {
  constructor(props) {
    super(props);
    this.state = { loading: true };
  }

  async componentDidMount() {
    const response2 = await fetch('/inventory');
    const body2 = await response2.json();
    if (body2.success) {
      this.props.handleLoadInventory(body2); //1st inventory then loading
    }

    const response = await fetch('/API-wishlist');
    const body = await response.json();
    console.log('body.itemsInWishList: ', body.itemsInWishList);
    if (body.success) {
      this.props.handleLoadWishList(body); //1st list then loading.
      this.setState({ loading: false });
    }
  }

  populateWishList = () => {
    let bookIds = this.props.itemsInWishList;
    console.log('bookIds: ', bookIds);
    console.log('this.props.inventory: ', this.props.inventory);
    const booksInList = bookIds.map(
      id => this.props.inventory.filter(book => book.id == Number(id))[0]
    );
    console.log(booksInList);
    return booksInList.map(item => (
      <ListItem key={item.id}>
        <Link to={`/item/${item.id}`}>
          <ListImage src={item.imagePath} />
        </Link>
        <Desc>
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
        </Desc>
      </ListItem>
    ));
  };

  render = () => {
    console.log('this.state: ', this.state);
    console.log('this.props: ', this.props);
    if (this.state.loading) {
      return 'loading';
    }
    let list = this.props.itemsInWishList;
    return (
      <ItemDetailCard>
        <ItemCard>
          {list.length > 0
            ? this.populateWishList()
            : "You haven't added anything to your wish list yet."}
          <Link to="/">
            <Button>Continue Shopping</Button>
          </Link>
        </ItemCard>
      </ItemDetailCard>
    );
  };
}

const mapStateToProps = state => {
  return {
    inventory: state.allInventory,
    userProfiles: state.allUserProfiles,
    lgin: state.loggedIn,
    username: state.username,
    itemsInWishList: state.itemsInWishList,
  };
};

const mapDispatchToProps = dispatch => ({
  handleLoadWishList: body =>
    dispatch({ type: 'LOAD_WISHLIST', itemsInWishList: body.itemsInWishList }),
  handleLoadInventory: body =>
    dispatch({ type: 'LOAD_INVENTORY', inventory: body.inventory }),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WishList);
