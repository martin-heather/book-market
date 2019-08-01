import { createStore } from 'redux';
import { inventory, userProfiles } from './data.js';

const initialState = {
  allInventory: [...inventory],
  allUserProfiles: [...userProfiles],
  loggedIn: false, 
  username: '',
}

function reducer(state = initialState, action) {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
      return { ...state, loggedIn: true, username: action.username };
      case 'LOGOUT':
      return { ...state, loggedIn: false, username: '' };
    default:
      return state;
  }
}

const store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
export default store;
