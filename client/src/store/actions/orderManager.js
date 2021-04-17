import * as actionTypes from './actionTypes';

export const selectDish = (selectedDish) => {
  return {
    type: actionTypes.SELECT_DISH,
    selectedDish: selectedDish,
  };
};

export const hideModal = () => {
  return {
    type: actionTypes.HIDE_DISH_MANAGER_MODAL,
  };
};

export const increaseAmount = () => {
  return {
    type: actionTypes.INCREASE_AMOUNT,
  };
};

export const decreaseAmount = () => {
  return {
    type: actionTypes.DECREASE_AMOUNT,
  };
};

export const confirmSelectedDish = (selectedDish) => {
  return {
    type: actionTypes.CONFIRM_SELECTED_DISH,
    selectedDish: selectedDish,
  };
};

export const showCart = () => {
  return {
    type: actionTypes.SHOW_CART,
  };
};

export const hideCart = () => {
  return {
    type: actionTypes.HIDE_CART,
  };
};

export const hideNotfication = () => {
  return {
    type: actionTypes.HIDE_NOTFICATION,
  };
};

export const removeCartItem = (cartItem) => {
  return {
    type: actionTypes.REMOVE_CART_ITEM,
    cartItem: cartItem,
  };
};

export const increaseAmountAtCart = (cartItem) => {
  return {
    type: actionTypes.INCREASE_AMOUNT_AT_CART,
    cartItem: cartItem,
  };
};

export const decreaseAmountAtCart = (cartItem) => {
  return {
    type: actionTypes.DECREASE_AMOUNT_AT_CART,
    cartItem: cartItem,
  };
};

export const startLoading = () => {
  return {
    type: actionTypes.START_LOADING,
  };
};

export const renderContactForm = () => {
  return {
    type: actionTypes.RENDER_CONTACT_FORM,
  };
};

export const updateContactForm = (updatedForm) => {
  return {
    type: actionTypes.UPDATE_CONTACT_FORM,
    updatedForm: updatedForm,
  };
};

export const submitOrder = (order) => {
  return {
    type: actionTypes.SUBMIT_ORDER,
    order: order,
  };
};

export const submitOrderSuccess = () => {
  return {
    type: actionTypes.SUBMIT_ORDER_SUCCESS,
  };
};
