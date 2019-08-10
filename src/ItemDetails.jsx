import React, { Component } from 'react';
import { connect } from 'react-redux';

import styled from 'styled-components';
import {
  ItemDetailCard,
  DetailDiv,
} from './StyledComponents/ItemDetailCard.jsx';
import { Button, GhostButton } from './StyledComponents/Buttons.jsx';

const Desc = styled.div`
  font-size: 0.75rem;
  text-align: left;
  padding: 15px;
`;

class ItemDetails extends Component {
  state = { loading: true, itemsInCart: [] };

  async componentDidMount() {
    const response = await fetch('/inventory');
    const body = await response.json();
    if (body.success) {
      this.props.handleLoadInventory(body); //1st inventory then loading.
      this.setState({ loading: false });
    }
  }

  addToCart = async event => {
    event.preventDefault();
    console.log('add to cart: ', this.state.itemsInCart);
    console.log('shopper: ', this.props.username);
    let data = new FormData();
    data.append('itemsInCart', this.state.itemsInCart);
    const response = await fetch('/addtocart', {
      method: 'POST',
      body: data,
      credentials: 'same-origin',
    });
    const body = await response.json();
    if (!body.success) return alert(body.message);

    const response2 = await fetch('/API-shoppingcart');
    const body2 = await response2.json();
    if (body2.success) {
      this.props.handleAddToCart(body2.itemsInCart);
    }
  };

  handleId = evt => {
    this.setState({ itemsInCart: evt.target.value });
  };

  addToWishList = event => {
    event.preventDefault();
    console.log('add to wish list: ', event.target.value);
    this.setState({ itemForWishList: event.target.value });
    console.log(this.state.itemForWishList);
  };

  render = () => {
    console.log('this.state: ', this.state);
    if (this.state.loading) {
      return 'loading';
    }
    console.log('this.props: ', this.props);
    console.log(this.props.itemObject);
    let item = this.props.itemObject;
    return (
      <ItemDetailCard>
        <DetailDiv>
          <img src={item.imagePath} />
        </DetailDiv>
        <DetailDiv>
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
          <form onSubmit={this.addToCart}>
            <Button onClick={this.handleId} value={item.id}>
              Add to Cart
            </Button>
          </form>{' '}
          <GhostButton onClick={this.addToWishList} value={item.id}>
            Add to Wish List
          </GhostButton>
          <Desc>
            {item.desc}
            <br />
            <br />
            <div>
              <strong>Seller: </strong>
              {item.seller}
            </div>
          </Desc>
        </DetailDiv>
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
  };
};

const mapDispatchToProps = dispatch => ({
  handleLoadInventory: body =>
    dispatch({ type: 'LOAD_INVENTORY', inventory: body.inventory }),
  handleAddToCart: cartItem =>
    dispatch({
      type: 'UPDATE_CART',
      itemForCart: cartItem,
    }),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ItemDetails);
