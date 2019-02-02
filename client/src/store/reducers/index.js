import {combineReducers} from 'redux';
import customerReducer from './customer';
import userReducer from './user';
import productReducer from './product';

export default combineReducers({
  customers: customerReducer,
  user: userReducer,
  product: productReducer
})
