import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import styled from 'styled-components';
import { FormWindow } from './StyledComponents/FormWindow.jsx';
import { Header } from './StyledComponents/Header.jsx';
import { Button } from './StyledComponents/Buttons.jsx';
import { FormHeader } from './StyledComponents/Cart.jsx';

const AddItemWrapper = styled(FormWindow)`
  text-align: left;
`;

const Input = styled.input`
  margin: 4px 0;
  width: 100%;
  height: 1.2rem;
  font-size: 0.6rem;
  font-family: 'Arbutus Slab', serif;
  color: var(--dark-blue);
  margin: 0;
  border-radius: var(--border-radius);
  -webkit-box-sizing: border-box; /* For legacy WebKit based browsers */
  -moz-box-sizing: border-box; /* For legacy (Firefox <29) Gecko based browsers */
  box-sizing: border-box;
  outline-width: 0;
`;

const Textarea = styled.textarea`
  margin: 4px 0;
  width: 100%;
  margin: 0;
  border-radius: var(--border-radius);
  font-size: 0.6rem;
  font-family: 'Arbutus Slab', serif;
  color: var(--dark-blue);
  -webkit-box-sizing: border-box; /* For legacy WebKit based browsers */
  -moz-box-sizing: border-box; /* For legacy (Firefox <29) Gecko based browsers */
  box-sizing: border-box;
  outline-width: 0;
`;

const InputButton = styled.input`
  margin: 10px auto;
  background-color: #002c59;
  color: #e4e4e4;
  font-family: 'Arbutus Slab', serif;
  font-size: 0.75rem;
  padding: 7px;
  border: 1px solid #002c59;
  border-radius: var(--border-radius);
  outline-width: 0;
  -webkit-transition-duration: 0.4s; /* Safari */
  transition-duration: 0.4s;
  :hover {
    transform: scale(1.05);
    box-shadow: 3px 3px 5px 0px rgba(50, 50, 50, 0.75);
  }
  :active {
    transform: scale(1);
    box-shadow: 3px 3px 5px 0px rgba(50, 50, 50, 0);
  }
`;

class AddItemForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // loading: true,
      title: '',
      author: '',
      desc: '',
      language: '',
      categories: [],
      price: '',
      imagePath: '',
    };
  }

  handleSubmit = async evt => {
    evt.preventDefault();
    console.log('form submitted');
    let data = new FormData();
    data.append('title', this.state.title);
    data.append('author', this.state.author);
    data.append('desc', this.state.desc);
    data.append('language', this.state.language);
    data.append('categories', this.state.categories);
    data.append('price', this.state.price);
    data.append('image', this.state.image);
    const response = await fetch('/additem', {
      method: 'POST',
      body: data,
      credentials: 'same-origin',
    });
    const body = await response.json();
    if (!body.success) return alert(body.message);

    const response2 = await fetch('/inventory');
    const body2 = await response2.json();
    if (body2.success) {
      this.props.handleUpdateInventory(body2);
      alert('Your book is now in the catalogue.');
    }
  };

  handleTitle = evt => {
    this.setState({ title: evt.target.value });
  };
  handleAuthor = evt => {
    this.setState({ author: evt.target.value });
  };
  handleDesc = evt => {
    this.setState({ desc: evt.target.value });
  };
  handleLanguage = evt => {
    this.setState({ language: evt.target.value });
  };
  handleCategory = evt => {
    this.setState({ categories: [evt.target.value] });
  };
  handlePrice = evt => {
    this.setState({ price: evt.target.value });
  };
  handleImagePath = evt => {
    this.setState({ image: evt.target.files[0] });
  };

  render() {
    let hidden = {
      visibility: 'hidden',
      width: '66%',
    };
    return (
      <AddItemWrapper>
        <FormHeader>Sell a Book</FormHeader>
        <form onSubmit={this.handleSubmit}>
          <label>
            <Input
              placeholder="Title"
              required
              type="text"
              onChange={this.handleTitle}
              value={this.state.title}
            />
          </label>
          <br />
          <label>
            <Input
              placeholder="Author (Last Name, First Name)"
              required
              type="text"
              onChange={this.handleAuthor}
              value={this.state.author}
            />
          </label>
          <br />
          <label>
            <Input
              placeholder="Language"
              required
              type="text"
              onChange={this.handleLanguage}
              value={this.state.language}
            />
          </label>
          <br />
          <label>
            <Input
              placeholder="Category"
              required
              type="text"
              onChange={this.handleCategory}
              value={this.state.categories}
            />
          </label>
          <br />
          <label>
            <Input
              placeholder="Price"
              required
              type="number"
              onChange={this.handlePrice}
              value={this.state.price}
            />
          </label>
          <br />
          <label className="uploadButton">
            Upload Book Cover
            <Input
              style={hidden}
              required
              type="file"
              onChange={this.handleImagePath}
              placeholder="Click to Upload Book Cover"
            />
          </label>
          <br />
          <label>
            <Textarea
              placeholder="Enter a description of your book."
              name="message"
              rows="5"
              cols="30"
              required
              onChange={this.handleDesc}
              value={this.state.desc}
            />
          </label>
          <center>
            <Button>Add Book to Inventory</Button>{' '}
            {/* <InputButton type="reset" value="Reset Form" /> */}
          </center>
        </form>
        <center>
          <Link to="/">
            <Button>Continue Shopping</Button>
          </Link>
        </center>
      </AddItemWrapper>
    );
  }
}

const mapStateToProps = state => {
  return {
    inventory: state.allInventory,
    userProfiles: state.allUserProfiles,
    lgin: state.loggedIn,
  };
};

const mapDispatchToProps = dispatch => ({
  handleUpdateInventory: body =>
    dispatch({
      type: 'UPDATE_INVENTORY',
      newInventory: body.inventory,
    }),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddItemForm);
