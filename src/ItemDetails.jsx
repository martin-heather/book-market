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

const Form = styled.form`
  display: inline-block;
`;

class ItemDetails extends Component {
  state = { loading: true, itemsInCart: [], itemsInWishList: [] };

  async componentDidMount() {
    const response = await fetch('/inventory');
    const body = await response.json();
    if (body.success) {
      this.props.handleLoadInventory(body); //1st inventory then loading.
      this.setState({ loading: false });
    }
  }

  addToCart = async evt => {
    evt.preventDefault();
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

  handleCartId = evt => {
    this.setState({ itemsInCart: evt.target.value });
  };

  addToWishList = async evt => {
    evt.preventDefault();
    console.log('add to list: ', this.state.itemsInWishList);
    console.log('shopper: ', this.props.username);
    let data = new FormData();
    data.append('itemsInList', this.state.itemsInWishList);
    const response = await fetch('/addtolist', {
      method: 'POST',
      body: data,
      credentials: 'same-origin',
    });
    const body = await response.json();
    if (!body.success) return alert(body.message);

    const response2 = await fetch('/API-wishlist');
    const body2 = await response2.json();
    if (body2.success) {
      this.props.handleAddToWishList(body2.itemsInWishList);
    }
  };

  handleListId = evt => {
    this.setState({ itemsInWishList: evt.target.value });
  };

  render = () => {
    console.log('this.state: ', this.state);
    if (this.state.loading) {
      return <ion-icon class="icon-big" name="refresh-circle" />;
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
          <Form onSubmit={this.addToCart}>
            <Button onClick={this.handleCartId} value={item.id}>
              Add to Cart
            </Button>
          </Form>{' '}
          <Form onSubmit={this.addToWishList}>
            <GhostButton onClick={this.handleListId} value={item.id}>
              Add to Wish List
            </GhostButton>
          </Form>
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
    dispatch({
      type: 'LOAD_INVENTORY',
      inventory: body.inventory,
    }),
  handleAddToCart: cartItem =>
    dispatch({
      type: 'UPDATE_CART',
      itemForCart: cartItem,
    }),
  handleAddToWishList: listItem =>
    dispatch({
      type: 'UPDATE_WISHLIST',
      itemForWishList: listItem,
    }),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ItemDetails);
