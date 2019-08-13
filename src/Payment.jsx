import React from 'react';
import { connect } from 'react-redux';
import StripeCheckout from 'react-stripe-checkout';

import { Button } from './StyledComponents/Buttons.jsx';

class TakeMoney extends React.Component {
  onToken = token => {
    fetch('/save-stripe-token', {
      method: 'POST',
      body: JSON.stringify(token),
    }).then(response => {
      response.json().then(data => {
        alert(`We are in business, ${data.email}`);
      });
    });
  };

  // ...

  render() {
    return (
      // ...
      <StripeCheckout
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
  };
};

export default connect(mapStateToProps)(TakeMoney);
