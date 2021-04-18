import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initalState = {
  myOrders: [],
  loading: false,
  error: null,
};

const addOrderToMyOrders = (state, action) => {
  return updateObject(state, {
    myOrders: state.myOrders.concat(action.fetchedOrder),
    error: null,
  });
};

const initMyOrders = (state, action) => {
  return updateObject(state, { loading: true });
};

const initMyOrdersSuccess = (state, action) => {
  return updateObject(state, {
    myOrders: action.fetchedOrders,
    loading: false,
  });
};

const initMyOrdersFail = (state, action) => {
  return updateObject(state, { error: action.error, loading: false });
};

const reducer = (state = initalState, action) => {
  switch (action.type) {
    case actionTypes.ADD_ORDER_TO_MY_ORDERS:
      return addOrderToMyOrders(state, action);
    case actionTypes.INIT_MY_ORDERS:
      return initMyOrders(state, action);
    case actionTypes.INIT_MY_ORDERS_SUCCESS:
      return initMyOrdersSuccess(state, action);
    case actionTypes.INIT_MY_ORDERS_FAIL:
      return initMyOrdersFail(state, action);
    default:
      return state;
  }
};

export default reducer;
