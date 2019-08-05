import { createStore } from 'redux';
import { inventory } from '../data.js';

const initialState = {
  allInventory: [...inventory],
  allUserProfiles: [],
  loggedIn: false, 
  username: '',
  password: '',
  query: '',
}

function reducer(state = initialState, action) {
  switch (action.type) {
    case 'LOGIN_SUCCESS':      
      return { ...state, 
        loggedIn: true, 
        allUserProfiles: [action.userProfile],
        username: action.username,
        password: action.password,
       };
    case 'LOGOUT':
      return { ...state, loggedIn: false, username: '' };
     case 'UPDATE_INVENTORY':
      return {
        ...state,
        allInventory: action.inventory,
        };
      case 'UPDATE_CART':
       let itemId = action.itemForCart;       
       console.log(itemId);
       console.log(state.allUserProfiles);
       let userObjArr = state.allUserProfiles.filter(user => user.name == state.username);
       let userObj = userObjArr[0];
       console.log(' userObj.itemsInCart: ',  userObj.itemsInCart);
       userObj.itemsInCart.push(itemId);
       console.log(userObj);
       console.log(state.allUserProfiles);
      return {   
        ...state,
        allUserProfiles: userObj
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
