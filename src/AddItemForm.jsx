import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { FormWindow } from './StyledComponents/FormWindow.jsx';
import { Header } from './StyledComponents/Header.jsx';

const AddItemWrapper = styled(FormWindow)`
text-align: left;
`;

const FormHeader = styled(Header)`
 background-image: linear-gradient(0deg, rgba(0, 44, 89, 0.9), rgba(0, 44, 89, 0.75));
`;

class AddItemForm extends Component {
  handleUpdateItem = (field, value) => {
            this.props.handleAddBook(
            { ...this.props.item, [field]: value,  timeAdded: Date.now()}
    );
  };
  handleTitle = (evt) => {
    this.handleUpdateItem('title', evt.target.value);
  };
  handleAuthor = (evt) => {
    this.handleUpdateItem('author', evt.target.value);
  };
  handleDesc = (evt) => {
    this.handleUpdateItem('desc', evt.target.value);
  };
  handleLanguage = (evt) => {
    this.handleUpdateItem('language', evt.target.value);
  };
  handleCategory = (evt) => {
    this.handleUpdateItem('category', evt.target.value);
  };
  handlePrice = (evt) => {
    this.handleUpdateItem('category', evt.target.value);
  };
  handleImagePath = (evt) => {
    this.handleUpdateItem('imagePath', evt.target.value);
  };

  render() {
    return (
      <AddItemWrapper>
<FormHeader>
    Sell a Book
</FormHeader>
        <label>
          Title{' '}
          <input
            required
            type="text"
            onChange={this.handleTitle}
            value={this.props.title}
          />
        </label><br/>
        <label>
          Author{' '}
          <input
            required
            type="text"
            onChange={this.handleAuthor}
            value={this.props.author}
          />
        </label><br/>
        <label>
          Description{' '}
          <input
            required
            type="text"
            onChange={this.handleDesc}
            value={this.props.desc}
          />
        </label><br/>
        <label>
          Language{' '}
          <input
            required
            type="text"
            onChange={this.handleLanguage}
            value={this.props.language}
          />
        </label><br/>
        <label>
          Category{' '}
          <input
            required
            type="text"
            onChange={this.handleCategory}
            value={this.props.category}
          />
        </label><br/>
        <label>
          Price{' '}
          <input
            required
            type="text"
            onChange={this.handlePrice}
            value={this.props.price}
          />
        </label><br/>
        <label>
          Image{' '}
          <input
            required
            type="text"
            onChange={this.handleImagePath}
            value={this.props.imagePath}
          />
        </label>
        <button>Add Book to Inventory</button>       
      </AddItemWrapper>
    );
  }
}



const mapDispatchToProps = (dispatch) => ({
  handleAddBook: () =>
    dispatch({ type: 'ADD_BOOk' }),
  
});

export default connect(

  mapDispatchToProps
)(AddItemForm);