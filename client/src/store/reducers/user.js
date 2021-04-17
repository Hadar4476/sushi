import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const tokenKey = 'token';

const initalState = {
  user: {},
  error: '',
};

const getAuthenticatedUser = (state, action) => {
  return updateObject(state, action);
};

const getAuthenticatedUserSuccess = (state, action) => {
  return updateObject(state, { user: action.authenticatedUser });
};

const getAuthenticatedUserFail = (state, action) => {
  return updateObject(state, { error: action.error });
};

const onUserLogout = (state, action) => {
  localStorage.removeItem(tokenKey);
  return updateObject(state, { user: {} });
};

const reducer = (state = initalState, action) => {
  switch (action.type) {
    case actionTypes.GET_AUTH_USER:
      return getAuthenticatedUser(state, action);
    case actionTypes.GET_AUTH_USER_SUCCESS:
      return getAuthenticatedUserSuccess(state, action);
    case actionTypes.GET_AUTH_USER_FAIL:
      return getAuthenticatedUserFail(state, action);
    case actionTypes.LOGOUT_USER:
      return onUserLogout(state, action);
    default:
      return state;
  }
};

export default reducer;
