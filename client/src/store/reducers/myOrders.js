import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initalState = {
  myOrders: [],
};

const initMyOrdersSuccess = (state, action) => {
  return updateObject(state, { myOrders: action.fetchedOrders });
};

const reducer = (state = initalState, action) => {
  switch (action.type) {
    case actionTypes.INIT_MY_ORDERS_SUCCESS:
      return initMyOrdersSuccess(state, action);
    default:
      return state;
  }
};

export default reducer;
