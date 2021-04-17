import * as actionTypes from './actionTypes';

export const getAuthenticatedUser = () => {
  return {
    type: actionTypes.GET_AUTH_USER,
  };
};

export const getAuthenticatedUserSuccess = (authenticatedUser) => {
  return {
    type: actionTypes.GET_AUTH_USER_SUCCESS,
    authenticatedUser: authenticatedUser,
  };
};

export const getAuthenticatedUserFail = (error) => {
  return {
    type: actionTypes.GET_AUTH_USER_FAIL,
    error: error,
  };
};

export const onUserLogout = () => {
  return {
    type: actionTypes.LOGOUT_USER,
  };
};
