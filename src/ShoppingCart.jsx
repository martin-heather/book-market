import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import TakeMoney from './Payment.jsx';

import styled from 'styled-components';
import { ItemDetailCard } from './StyledComponents/ItemDetailCard.jsx';
import { ItemCard } from './StyledComponents/ItemCard.jsx';
import { Button } from './StyledComponents/Buttons.jsx';

const CartDetailCard = styled(ItemDetailCard)`
  width: 550px;
  font-size: 0.75rem;
  text-align: left;
  padding: 15px;
`;

const CartItemCard = styled(ItemCard)`
  width: 450px;
  font-size: 0.75rem;
  text-align: left;
  padding: 15px;
`;

const Desc = styled.div`
  width: 350px;
  font-size: 0.75rem;
  text-align: left;
  padding: 15px;
`;

const CartItem = styled.div`
  display: flex;
  width: 100%;
  font-size: 0.75rem;
  text-align: left;
  padding: 15px;
`;

const CartImage = styled.img`
  max-width: 60px;
  margin: 15px;
`;

const WideDiv = styled.div`
  text-align: center;
`;

const Right = styled.div`
  padding-right: 30px;
  text-align: right;
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
        <h3>
          <center>Shopping Cart</center>
        </h3>
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
        <WideDiv>
          <Link to="/">
            <Button>Continue Shopping</Button>
          </Link>{' '}
          <TakeMoney />
        </WideDiv>
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
          {cart.length > 0 ? (
            this.populateUserCart()
          ) : (
            <>
              <div>You haven't added anything to your cart yet.</div>{' '}
              <Link to="/">
                <Button>Continue Shopping</Button>
              </Link>
            </>
          )}
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
