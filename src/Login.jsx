import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Button, Input } from './StyledComponents/Buttons.jsx';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
    };
  }
  handleUsernameChange = evt => {
    console.log('new username', evt.target.value);
    this.setState({ username: evt.target.value });
  };
  handlePasswordChange = evt => {
    console.log('new password', evt.target.value);
    this.setState({ password: evt.target.value });
  };
  handleSubmit = async evt => {
    evt.preventDefault();
    console.log('login form submitted');
    let data = new FormData();
    data.append('username', this.state.username);
    data.append('password', this.state.password);
    let response = await fetch('/login', {
      method: 'POST',
      body: data,
      credentials: 'include',
    });
    let responseBody = await response.text();
    console.log('responseBody from login', responseBody);
    let body = JSON.parse(responseBody);
    console.log('parsed body', body);
    if (!body.success) {
      alert('login failed');
      return;
    }
    this.props.dispatch({
      type: 'LOGIN_SUCCESS',
      username: this.state.username,
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

export default connect()(Login);
