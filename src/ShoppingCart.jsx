import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import TakeMoney from './Payment.jsx';

import styled from 'styled-components';
import { Button } from './StyledComponents/Buttons.jsx';
import {
  FormHeader,
  CartDetailCard,
  CartItemCard,
  Desc,
  CartItem,
  CartImage,
  WideDiv,
  Right,
} from './StyledComponents/Cart.jsx';

const Header = styled(FormHeader)`
  margin-bottom: 0;
`;

class ShoppingCart extends Component {
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

    const response = await fetch('/API-shoppingcart');
    const body = await response.json();
    console.log('body.itemsInCart: ', body.itemsInCart);
    if (body.success) {
      this.props.handleLoadCart(body); //1st cart then loading.
      this.setState({ loading: false });
    }
  }

  populateUserCart = () => {
    let bookIds = this.props.itemsInCart;
    console.log('bookIds: ', bookIds);
    console.log('this.props.inventory: ', this.props.inventory);
    const booksInCart = bookIds.map(
      id => this.props.inventory.filter(book => book.id == Number(id))[0]
    );
    console.log(booksInCart);
    let cartTotals = booksInCart.map(item => item.price);
    let grandTotal = cartTotals.reduce((a, b) => a + b, 0);
    this.props.handleCartTotal(grandTotal);
    return (
      <CartItemCard>
        {booksInCart.map(item => (
          <CartItem key={item.id}>
            <Link to={`/item/${item.id}`}>
              <CartImage src={item.imagePath} />
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
          </CartItem>
        ))}
        <div>
          <Right>
            <strong>Total: ${grandTotal.toFixed(2)}</strong>
          </Right>
        </div>
        <div>
          <center>
            <Link to="/">
              <Button>Continue Shopping</Button>
            </Link>{' '}
            <TakeMoney />
          </center>
        </div>
      </CartItemCard>
    );
  };

  render = () => {
    console.log('this.state: ', this.state);
    console.log('this.props: ', this.props);
    if (this.state.loading) {
      return 'loading';
    }
    let cart = this.props.itemsInCart;
    return (
      <CartDetailCard>
        <CartItemCard>
          <Header>
            <center>Shopping Cart</center>
          </Header>
          <center>
            {cart.length > 0 ? (
              <center>{this.populateUserCart()}</center>
            ) : (
              <>
                <div>Your cart is empty.</div>{' '}
                <Link to="/">
                  <Button>Continue Shopping</Button>
                </Link>
              </>
            )}
          </center>
        </CartItemCard>
      </CartDetailCard>
    );
  };
}

const mapStateToProps = state => {
  return {
    inventory: state.allInventory,
    userProfiles: state.allUserProfiles,
    lgin: state.loggedIn,
    username: state.username,
    itemsInCart: state.itemsInCart,
  };
};

const mapDispatchToProps = dispatch => ({
  handleLoadCart: body =>
    dispatch({ type: 'LOAD_CART', itemsInCart: body.itemsInCart }),
  handleLoadInventory: body =>
    dispatch({ type: 'LOAD_INVENTORY', inventory: body.inventory }),
  handleCartTotal: cartTotal =>
    dispatch({ type: 'UPDATE_TOTAL', cartTotal: cartTotal }),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ShoppingCart);
