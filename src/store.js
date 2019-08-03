import { createStore } from 'redux';
import { inventory } from '../data.js';

const initialState = {
  allInventory: [...inventory],
  allUserProfiles: [],
  loggedIn: false, 
  username: '',
  query: '',
}

function reducer(state = initialState, action) {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
      return { ...state, loggedIn: true, username: action.username };
    case 'LOGOUT':
      return { ...state, loggedIn: false, username: '' };
      case 'UPDATE_INVENTORY':
        return {
          ...state,
          allInventory: action.inventory,
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
