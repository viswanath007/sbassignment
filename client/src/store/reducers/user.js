import {
  ADD_USER,
  AUTH_USER,
  CHECK_USER_NAME_AVAILABILITY
} from '../actions/constants';

const defaultState = {
  userName: null,
  isAutherised: null,
  isAvailable: null
}

const userReducer = (state = defaultState, {type, payload}) => {
    switch (type) {
      case ADD_USER:
        // const { userName, isAutherised } = payload;
        // return { ...state, userName, isAutherised};
      case AUTH_USER:
        const { userName, isAutherised } = payload;
        return { ...state, userName, isAutherised };
      case CHECK_USER_NAME_AVAILABILITY:
        return { ...state, isAvailable: payload};
      default:
        return state
    }
}

export default userReducer;
