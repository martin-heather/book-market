import React, { Component } from 'react';
import { connect } from 'react-redux';

import { FormWindow } from './StyledComponents/FormWindow.jsx';
import { Button, Input } from './StyledComponents/Buttons.jsx';

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
    };
  }

  state = { loading: true };
  async componentDidMount() {
    const response = await fetch('/session');
    const body = await response.json();
    if (body.success) {
      this.props.dispatch({ type: 'LOGIN_SUCCESS', username: body.username });
    }
    const response2 = await fetch('/inventory');
    const body2 = await response2.json();
    if (body2.success) {
      this.props.dispatch({
        type: 'LOAD_INVENTORY',
        inventory: body2.inventory,
      });
      this.setState({ loading: false });
    }
  }

  handleUsernameChange = event => {
    console.log('new username: ', event.target.value);
    this.setState({ username: event.target.value });
  };
  handlePasswordChange = event => {
    console.log('new password: ', event.target.value);
    this.setState({ password: event.target.value });
  };
  handleSubmit = async evt => {
    evt.preventDefault();
    console.log('signup form submitted');
    let data = new FormData();
    data.append('username', this.state.username);
    data.append('password', this.state.password);
    const response = await fetch('/signup', {
      method: 'POST',
      body: data,
      credentials: 'same-origin',
    });
    const body = await response.json();
    if (!body.success) return alert(body.message);
    this.props.dispatch({
      type: 'LOGIN_SUCCESS',
      username: this.state.username,
      password: this.state.password,
      userProfile: {
        name: this.state.username,
        password: this.state.password,
        itemsInWishList: [],
        itemsForSale: [],
        itemsInCart: [],
      },
    });
  };
  render = () => {
    return (
      <div className="overlay">
        {' '}
        <FormWindow>
          <h3>Signup</h3>
          <form onSubmit={this.handleSubmit}>
            <p>
              Username{' '}
              <Input type="text" onChange={this.handleUsernameChange} />
            </p>
            <p>
              Password{' '}
              <Input type="password" onChange={this.handlePasswordChange} />
            </p>
            <Button>submit</Button>
          </form>
        </FormWindow>
      </div>
    );
  };
}

const mapStateToProps = state => {
  return { lgin: state.loggedIn, inventory: state.allInventory };
};

export default connect(mapStateToProps)(Signup);
