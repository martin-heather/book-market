import React, { Component } from 'react';
import { connect } from 'react-redux';


import FrontPageHeader from './FrontPageHeader.jsx';
import PageHeader from './PageHeader.jsx';
import FrontMenuBar from './FrontMenuBar.jsx';
import MenuBar from './MenuBar.jsx';
import Login from './Login.jsx';
import Signup from './Signup.jsx';
import Inventory from './Inventory.jsx';

import { FormWindow } from './StyledComponents/FormWindow.jsx';


class FrontPage extends Component {
  async componentDidMount() {
    const response = await fetch('/session');
    const body = await response.json();
    if (body.success) {
      this.props.dispatch({ type: 'LOGIN_SUCCESS', username: body.username });
    }
  }


  render() {
    if (this.props.lgin) {
      return (
      <div>
      <PageHeader />
        <MenuBar /> 
        <Inventory />
        </div>
        )
      };
      return (
      <div>
        <FrontPageHeader />
        <FrontMenuBar />  
        <FormWindow>  
        <h3>Signup</h3>
        <Signup />  
        <h3>Login</h3>
        <Login />
        </FormWindow>        
      </div>      
    );
  }
}
const mapStateToProps = state => {
  return { inventory: state.allInventory, 
    lgin: state.loggedIn };
};
export default connect(mapStateToProps)(FrontPage);
