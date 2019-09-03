import React from 'react';
import { connect } from 'react-redux';
import StripeCheckout from 'react-stripe-checkout';

import { Button } from './StyledComponents/Buttons.jsx';

class Checkout extends React.Component {
  onToken = token => {
    fetch('/save-stripe-token', {
      method: 'POST',
      body: JSON.stringify(token),
    }).then(res => {
      res.json().then(() => {
        alert(`Thank you for your purchase.`);
        this.props.handleClearCart;
      });
    });
  };

  render() {
    return (
      <StripeCheckout
        image="/images/a.png"
        name="Alibay Bookstore"
        billingAddress
        token={this.onToken}
        stripeKey="pk_test_Dd1CvRncizSuBMF57u8wU9Jl00r2AcxDSj"
        amount={this.props.cartTotal * 100}
      >
        <Button>Proceed to Checkout</Button>
      </StripeCheckout>
    );
  }
}

const mapStateToProps = state => {
  return {
    cartTotal: state.cartTotal,
    itemsInCart: state.itemsInCart,
  };
};

const mapDispatchToProps = dispatch => ({
  handleClearCart: () => dispatch({ type: 'CLEAR_CART', itemsInCart: [] }),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Checkout);
