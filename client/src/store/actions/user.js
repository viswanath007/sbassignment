import {
  ADD_USER,
  AUTH_USER,
  CHECK_USER_NAME_AVAILABILITY
} from './constants';


export const addUser = (data) => dispatch => {
  fetch('/api/user/add', {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(res => res.json())
    .then((user) => dispatch({ type: ADD_USER, payload: user}))
}

export const authenticateUser = (data) => dispatch => {
  fetch('/api/user/auth', {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(res => res.json())
    .then((user) => dispatch({ type: AUTH_USER, payload: user}))
}

export const checkUserNameAvailability = (data) => dispatch => {
  fetch('/api/user/checkExistance', {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(res => res.json())
    .then(({ isAvailable }) => {
      if(!isAvailable){
        alert("user already exists");
      }
      return dispatch({ type: CHECK_USER_NAME_AVAILABILITY, payload: isAvailable });
    })
}

