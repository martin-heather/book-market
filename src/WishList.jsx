import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import styled from 'styled-components';
import { Button } from './StyledComponents/Buttons.jsx';
import {
  FormHeader,
  CartDetailCard,
  CartItemCard,
  Desc,
  CartItem,
  CartImage,
} from './StyledComponents/Cart.jsx';

const Header = styled(FormHeader)`
  margin-bottom: 0;
`;

const Form = styled.form`
  display: inline-block;
`;

const Image = styled(CartImage)`
  max-width: 85px;
`;

const InlineButton = styled(Button)`
  padding: 2px 7px;
`;

const ShopButton = styled(Button)`
  margin: 25px auto 10px auto;
`;

class WishList extends Component {
  constructor(props) {
    super(props);
    this.state = { loading: true, itemsInCart: [], itemsInWishList: [] };
  }

  async componentDidMount() {
    const response = await fetch('/inventory');
    const body = await response.json();
    if (body.success) {
      this.props.handleLoadInventory(body); //1st inventory then loading
    }

    const response3 = await fetch('/API-wishlist');
    const body3 = await response3.json();
    console.log('body3.itemsInWishList: ', body3.itemsInWishList);
    if (body3.success) {
      this.props.handleLoadWishList(body3); //1st list then loading.
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
    //** */remove item from wish list
    let itemId = evt.target.value;
    console.log('itemId: ', itemId);
    let listItems = this.state.itemsInWishList;
    console.log('listItems: ', listItems);
    this.setState({
      itemsInWishList: listItems.filter(item => item.id !== itemId),
    });
    console.log('this.state.itemsInWishList: ', this.state.itemsInWishList);
    //** */
  };

  handleCartId = evt => {
    this.setState({ itemsInCart: evt.target.value });
    // //** */remove item from wish list
    // let itemId = evt.target.value;
    // console.log('itemId: ', itemId);
    // let listItems = this.state.itemsInWishList;
    // console.log('listItems: ', listItems);
    // this.setState({
    //   itemsInWishList: listItems.filter(item => item.id !== itemId),
    // });
    // console.log('this.state.itemsInWishList: ', this.state.itemsInWishList);
  };

  populateWishList = () => {
    let bookIds = this.props.itemsInWishList;
    console.log('bookIds: ', bookIds);
    console.log('this.props.inventory: ', this.props.inventory);
    const booksInList = bookIds.map(
      id => this.props.inventory.filter(book => book.id == Number(id))[0]
    );
    console.log(booksInList);
    return (
      <CartItemCard>
        {booksInList.map(item => (
          <CartItem key={item.id}>
            <Link to={`/item/${item.id}`}>
              <Image src={item.imagePath} />
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
              <Form onSubmit={this.addToCart}>
                <InlineButton onClick={this.handleCartId} value={item.id}>
                  Add to Cart
                </InlineButton>
              </Form>
            </Desc>
          </CartItem>
        ))}
      </CartItemCard>
    );
  };

  render = () => {
    console.log('this.state: ', this.state);
    console.log('this.props: ', this.props);
    if (this.state.loading) {
      return 'loading';
    }
    let list = this.props.itemsInWishList;
    return (
      <CartDetailCard>
        <CartItemCard>
          <Header>
            <center>Wish List</center>
          </Header>
          <center>
            {list.length > 0
              ? this.populateWishList()
              : "You haven't added anything to your wish list yet."}

            <Link to="/">
              <ShopButton>Continue Shopping</ShopButton>
            </Link>
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
    itemsInWishList: state.itemsInWishList,
  };
};

const mapDispatchToProps = dispatch => ({
  handleLoadWishList: body =>
    dispatch({ type: 'LOAD_WISHLIST', itemsInWishList: body.itemsInWishList }),
  handleAddToCart: cartItem =>
    dispatch({
      type: 'UPDATE_CART',
      itemForCart: cartItem,
    }),
  handleLoadInventory: body =>
    dispatch({ type: 'LOAD_INVENTORY', inventory: body.inventory }),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WishList);
