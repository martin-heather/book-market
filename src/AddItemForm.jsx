import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import styled from 'styled-components';
import { FormWindow } from './StyledComponents/FormWindow.jsx';
import { Header } from './StyledComponents/Header.jsx';

const AddItemWrapper = styled(FormWindow)`
  text-align: left;
`;

const FormHeader = styled(Header)`
  background-image: linear-gradient(
    0deg,
    rgba(0, 44, 89, 0.9),
    rgba(0, 44, 89, 0.75)
  );
`;

class AddItemForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      author: '',
      desc: '',
      language: '',
      category: '',
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
    data.append('category', this.state.category);
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
      this.props.dispatch({
        type: 'UPDATE_INVENTORY',
        newInventory: body2.inventory,
      });
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
    this.setState({ category: evt.target.value });
  };
  handlePrice = evt => {
    this.setState({ price: evt.target.value });
  };
  handleImagePath = evt => {
    this.setState({ image: event.target.files[0] });
  };

  render() {
    return (
      <AddItemWrapper>
        <FormHeader>Sell a Book</FormHeader>
        <form onSubmit={this.handleSubmit}>
          <label>
            Title{' '}
            <input
              required
              type="text"
              onChange={this.handleTitle}
              value={this.state.title}
            />
          </label>
          <br />
          <label>
            Author{' '}
            <input
              required
              type="text"
              onChange={this.handleAuthor}
              value={this.state.author}
            />
          </label>
          <br />
          <label>
            Language{' '}
            <input
              required
              type="text"
              onChange={this.handleLanguage}
              value={this.state.language}
            />
          </label>
          <br />
          <label>
            Category{' '}
            <input
              required
              type="text"
              onChange={this.handleCategory}
              value={this.state.category}
            />
          </label>
          <br />
          <label>
            Price{' '}
            <input
              required
              type="text"
              onChange={this.handlePrice}
              value={this.state.price}
            />
          </label>
          <br />
          <label>
            Image <input required type="file" onChange={this.handleImagePath} />
          </label>
          <br />
          <label>
            Description{' '}
            <input
              required
              type="text"
              onChange={this.handleDesc}
              value={this.state.desc}
            />
          </label>
          <button>Add Book to Inventory</button>
        </form>
      </AddItemWrapper>
    );
  }
}

export default connect()(AddItemForm);
