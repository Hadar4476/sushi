import * as actionTypes from './actionTypes';

export const addOrderToMyOrders = (fetchedOrder) => {
  return {
    type: actionTypes.ADD_ORDER_TO_MY_ORDERS,
    fetchedOrder: fetchedOrder,
  };
};

export const initMyOrders = () => {
  return {
    type: actionTypes.INIT_MY_ORDERS,
  };
};

export const initMyOrdersSuccess = (fetchedOrders) => {
  return {
    type: actionTypes.INIT_MY_ORDERS_SUCCESS,
    fetchedOrders: fetchedOrders,
  };
};

export const initMyOrdersFail = (error) => {
  return {
    type: actionTypes.INIT_MY_ORDERS_FAIL,
    error: error,
  };
};
