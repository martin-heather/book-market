import { createStore } from 'redux';

const initialState = {
  allInventory: [],
  allUserProfiles: [],
  loggedIn: false, //document.cookie?
  username: '',
  query: '',
  itemsInCart: [],
  itemsInWishList: [],
  signin: 'login',
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
      console.log(action);
      return {
        ...state,
        loggedIn: true,
        allUserProfiles: [action.userProfile],
        username: action.username,
      };
    case 'LOGOUT':
      return { ...state, loggedIn: false, username: '', itemsInCart: [] };
    case 'LOAD_USERS':
      console.log('state: ', state, 'action: ', action);
      return {
        ...state,
        allUserProfiles: action.userProfiles,
      };
    case 'LOAD_INVENTORY':
      console.log(state, action);
      return {
        ...state,
        allInventory: action.inventory,
      };
    case 'UPDATE_INVENTORY':
      return {
        ...state,
        allInventory: [action.newItem],
      };
    case 'LOAD_CART':
      console.log('state: ', state, 'action: ', action);
      return {
        ...state,
        itemsInCart: action.itemsInCart,
      };
    case 'UPDATE_CART':
      let itemId = Number(action.itemForCart);
      return {
        ...state,
        itemsInCart: state.itemsInCart.concat([itemId]),
      };
    case 'LOAD_WISHLIST':
      console.log('state: ', state, 'action: ', action);
      return {
        ...state,
        itemsInWishList: action.itemsInWishList,
      };
    case 'UPDATE_WISHLIST':
      let listItem = Number(action.itemForWishList);
      return {
        ...state,
        itemsInWishList: state.itemsInWishList.concat([listItem]),
      };
    case 'SET_QUERY':
      return { ...state, query: action.query };
    default:
      return state;
  }
}

const store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
export default store;
