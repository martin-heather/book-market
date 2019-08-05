import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';

import FrontPageHeader from './FrontPageHeader.jsx';
import PageHeader from './PageHeader.jsx';
import FrontMenuBar from './FrontMenuBar.jsx';
import MenuBar from './MenuBar.jsx';
import Login from './Login.jsx';
import Signup from './Signup.jsx';
import Home from './Home.jsx';

import { FormWindow } from './StyledComponents/FormWindow.jsx';


class App extends Component {
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
        <BrowserRouter>
        <PageHeader />
        <MenuBar /> 
        <Home />
        </BrowserRouter>    
        </div>
        )
      };
      return (
      <div>
        <BrowserRouter>
        <FrontPageHeader />
        <FrontMenuBar />  
        <FormWindow>  
        <h3>Signup</h3>
        <Signup />  
        <h3>Login</h3>
        <Login />
        </FormWindow> 
        </BrowserRouter>       
      </div>      
    );
  }
}
const mapStateToProps = state => {
  return { lgin: state.loggedIn };
};
export default connect(mapStateToProps)(App);
