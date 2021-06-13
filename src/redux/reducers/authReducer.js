import { LOGIN, LOGOUT } from '../actionCreators/actions';

const authReducer = (state = {}, action) => {
  if (action.type === LOGIN) {
    return { ...state, token: action.token };
  }
  if (action.type === LOGOUT) {
    return { };
  }

  return state;
};

export default authReducer;
