import {
  ADD_PORDUCT,
  GET_PORDUCTS,
} from '../actions/constants';

const defaultState = {
  product: {},
  products: [],
}

const productReducer = (state = defaultState, {type, payload}) => {
    switch (type) {
      case ADD_PORDUCT:
        return { ...state, product: payload};
      case GET_PORDUCTS:
        return { ...state, products: payload};
      default:
        return state
    }
}

export default productReducer;
