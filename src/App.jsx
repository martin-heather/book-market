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
import AddItemForm from './AddItemForm.jsx';
import ShoppingCart from './ShoppingCart.jsx';
import ItemDetails from './ItemDetails.jsx';

import { FormWindow } from './StyledComponents/FormWindow.jsx';

class App extends Component {
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
    }
  }

  renderShoppingCart = () => {
    return <ShoppingCart />;
  };

  renderAddItem = () => {
    return <AddItemForm />;
  };

  renderHome = () => {
    return <Home />;
  };

  renderItemDetails = routerData => {
    let itemId = routerData.match.params.id;
    console.log('itemId: ', itemId);
    console.log(this.props.inventory);

    let itemObject = this.props.inventory.find(item => item.id == itemId);
    console.log('itemObject: ', itemObject);

    return <ItemDetails itemObject={itemObject} />;
  };

  render() {
    if (this.props.lgin) {
      return (
        <div>
          <BrowserRouter>
            <PageHeader />
            <MenuBar />
            <Route exact={true} path="/" render={this.renderHome} />
            <Route
              exact={true}
              path="/shoppingcart"
              render={this.renderShoppingCart}
            />
            <Route exact={true} path="/additem" render={this.renderAddItem} />
            <Route
              exact={true}
              path="/item/:id"
              render={this.renderItemDetails}
            />
          </BrowserRouter>
        </div>
      );
    }
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
  return { lgin: state.loggedIn, inventory: state.allInventory };
};
export default connect(mapStateToProps)(App);
