import { createStore } from 'redux';

const initialState = {
  allInventory: [],
  allUserProfiles: [],
  loggedIn: false, //document.cookie
  username: '',
  query: '',
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        loggedIn: true,
        allUserProfiles: [action.userProfile],
        username: action.username,
      };
    case 'LOGOUT':
      return { ...state, loggedIn: false, username: '' };
    case 'LOAD_INVENTORY':
      console.log(action.inventory);
      return {
        ...state,
        allInventory: action.inventory,
      };
    case 'UPDATE_INVENTORY':
      console.log('action.newInventory: ', action.newInventory);
      return {
        ...state,
        allInventory: [action.newItem],
      };
    case 'UPDATE_CART':
      let itemId = action.itemForCart;
      console.log(itemId);
      console.log(state.allUserProfiles);
      let userObjArr = state.allUserProfiles.filter(
        user => user.name == state.username
      );
      let userObj = userObjArr[0];
      console.log(' userObj.itemsInCart: ', userObj.itemsInCart);
      userObj.itemsInCart = userObj.itemsInCart.concat([Number(itemId)]);
      console.log(userObj.itemsInCart);
      console.log(userObj);
      return {
        ...state,
        allUserProfiles: [userObj],
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
