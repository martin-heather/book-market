import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';

import FrontPage from './FrontPage.jsx';


class App extends Component {
  render() {
    return (
      <div>
        <BrowserRouter>
        <FrontPage />
        </BrowserRouter>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return { lgin: state.loggedIn };
};
export default connect(mapStateToProps)(App);
