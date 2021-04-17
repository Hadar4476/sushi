import * as actionTypes from './actionTypes';

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
