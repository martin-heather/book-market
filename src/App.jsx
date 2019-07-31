import React, { Component } from 'react';
import { connect } from 'react-redux';
import Login from './Login.jsx';
import Signup from './Signup.jsx';

class App extends Component {
  render() {
    return (
      <div>
        <h1>Signup</h1>
        <Signup />
        <h1>Login</h1>
        <Login />
      </div>
    );
  }
}
const mapStateToProps = state => {
  return { lgin: state.loggedIn };
};
export default connect(mapStateToProps)(App);
