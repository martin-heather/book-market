import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Button, Input } from './StyledComponents/Buttons.jsx';

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
    };
  }
  handleUsernameChange = evt => {
    console.log('new username: ', evt.target.value);
    this.setState({ username: evt.target.value });
  };
  handlePasswordChange = evt => {
    console.log('new password: ', evt.target.value);
    this.setState({ password: evt.target.value });
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
      <form onSubmit={this.handleSubmit}>
        <p>
          Username <Input type="text" onChange={this.handleUsernameChange} />
        </p>
        <p>
          Password{' '}
          <Input type="password" onChange={this.handlePasswordChange} />
        </p>
        <Button>submit</Button>
      </form>
    );
  };
}

export default connect()(Signup);
