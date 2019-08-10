import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import TakeMoney from './Payment.jsx';

import styled from 'styled-components';
import {
  ItemDetailCard,
  DetailDiv,
} from './StyledComponents/ItemDetailCard.jsx';
import { ItemCard } from './StyledComponents/ItemCard.jsx';
import { Button } from './StyledComponents/Buttons.jsx';

const Desc = styled.div`
  font-size: 0.75rem;
  text-align: left;
  padding: 15px;
`;

const CartItem = styled.div`
  display: flex;
  width: 80%;
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
    return booksInCart.map(item => (
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
    ));
  };

  render = () => {
    console.log('this.state: ', this.state);
    console.log('this.props: ', this.props);
    if (this.state.loading) {
      return 'loading';
    }
    let cart = this.props.itemsInCart;
    return (
      <ItemDetailCard>
        <ItemCard>
          {cart.length > 0
            ? this.populateUserCart()
            : "You haven't added anything to your cart yet."}
        </ItemCard>
        <WideDiv>
          <Button>Proceed to Checkout</Button>
          <TakeMoney />
        </WideDiv>
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
    itemsInCart: state.itemsInCart,
  };
};

const mapDispatchToProps = dispatch => ({
  handleLoadCart: body =>
    dispatch({ type: 'LOAD_CART', itemsInCart: body.itemsInCart }),
  handleLoadInventory: body =>
    dispatch({ type: 'LOAD_INVENTORY', inventory: body.inventory }),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ShoppingCart);
