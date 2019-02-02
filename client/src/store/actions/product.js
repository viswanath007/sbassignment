import {
  ADD_PORDUCT,
  GET_PORDUCTS,
} from './constants';


export const addProduct = (data) => dispatch => {
  return fetch('/api/product/add', {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(res => res.json())
    .then(({ products }) => {
      // dispatch({ type: ADD_PORDUCT, payload: product})
      return dispatch({ type: GET_PORDUCTS, payload: products });
    })
}

export const getProducts = (data) => dispatch => {
  return fetch('/api/product/getProducts', {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(res => res.json())
    .then(({ products }) => dispatch({ type: GET_PORDUCTS, payload: products}))
}
