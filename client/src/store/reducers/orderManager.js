import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';
import { enableBodyScroll } from 'body-scroll-lock';

const initalState = {
  cart: [],
  selectedDish: {},
  contactForm: {
    name: {
      elementType: 'input',
      labelHTML: 'Your Name',
      elementConfig: {
        type: 'text',
      },
      value: '',
      valid: false,
    },
    address: {
      elementType: 'input',
      labelHTML: 'Address',
      elementConfig: {
        type: 'address',
      },
      value: '',
      valid: false,
    },
    phone: {
      elementType: 'input',
      labelHTML: 'Phone',
      elementConfig: {
        type: 'tel',
      },
      value: '',
      valid: false,
    },
  },
  displayManager: false,
  displayCart: false,
  displayNotfication: false,
  displayContactForm: false,
  loading: false,
  error: null,
};

const selectDish = (state, action) => {
  return updateObject(state, {
    selectedDish: action.selectedDish,
    displayManager: true,
  });
};

const hideManagerModal = (state, action) => {
  enableBodyScroll(document.getElementsByTagName('body')[0]);
  return updateObject(state, {
    selectedDish: {},
    displayManager: false,
  });
};

const increaseAmount = (state, action) => {
  return updateObject(state, {
    selectedDish: {
      ...state.selectedDish,
      amount: ++state.selectedDish.amount,
    },
  });
};

const decreaseAmount = (state, action) => {
  return updateObject(state, {
    selectedDish: {
      ...state.selectedDish,
      amount: --state.selectedDish.amount,
    },
  });
};

const confirmSelectedDish = (state, action) => {
  const cartClone = [...state.cart];
  const updatedCart = cartClone.concat(action.selectedDish);
  return updateObject(state, { cart: updatedCart, displayNotfication: true });
};

const hideNotfication = (state, action) => {
  return updateObject(state, { displayNotfication: false });
};

const removeCartItem = (state, action) => {
  const cartClone = [...state.cart];
  const updatedCart = cartClone.filter((item) => item.name !== action.cartItem);
  return updateObject(state, { cart: updatedCart });
};

const showCart = (state, action) => {
  return updateObject(state, { displayCart: true, displayContactForm: false });
};

const hideCart = (state, action) => {
  const resetFormModal = { ...state.contactForm };
  for (const key in resetFormModal) {
    resetFormModal[key].value = '';
    resetFormModal[key].valid = false;
  }
  return updateObject(state, {
    displayCart: false,
    displayContactForm: false,
    contactForm: resetFormModal,
  });
};

const increaseAmountAtCart = (state, action) => {
  const cartClone = [...state.cart];
  const updatedCart = cartClone.map((item) =>
    item.name === action.cartItem ? { ...item, amount: ++item.amount } : item
  );
  return updateObject(state, { cart: updatedCart });
};

const decreaseAmountAtCart = (state, action) => {
  const cartClone = [...state.cart];
  const updatedCart = cartClone.map((item) =>
    item.name === action.cartItem ? { ...item, amount: --item.amount } : item
  );
  return updateObject(state, { cart: updatedCart });
};

const startLoading = (state, action) => {
  return updateObject(state, { loading: true });
};

const renderContactForm = (state, action) => {
  return updateObject(state, { loading: false, displayContactForm: true });
};

const updateContactForm = (state, action) => {
  return updateObject(state, { contactForm: action.updatedForm });
};

const submitOrderSuccess = (state, action) => {
  const resetFormModal = { ...state.contactForm };
  for (const key in resetFormModal) {
    resetFormModal[key].value = '';
    resetFormModal[key].valid = false;
  }
  return updateObject(state, {
    contactForm: resetFormModal,
    displayContactForm: false,
    displayCart: false,
    cart: [],
  });
};

const orderAgain = (state, action) => {
  return updateObject(state, { cart: action.cart });
};

const reducer = (state = initalState, action) => {
  switch (action.type) {
    case actionTypes.SELECT_DISH:
      return selectDish(state, action);
    case actionTypes.HIDE_DISH_MANAGER_MODAL:
      return hideManagerModal(state, action);
    case actionTypes.INCREASE_AMOUNT:
      return increaseAmount(state, action);
    case actionTypes.DECREASE_AMOUNT:
      return decreaseAmount(state, action);
    case actionTypes.CONFIRM_SELECTED_DISH:
      return confirmSelectedDish(state, action);
    case actionTypes.SHOW_CART:
      return showCart(state, action);
    case actionTypes.HIDE_CART:
      return hideCart(state, action);
    case actionTypes.HIDE_NOTFICATION:
      return hideNotfication(state, action);
    case actionTypes.REMOVE_CART_ITEM:
      return removeCartItem(state, action);
    case actionTypes.INCREASE_AMOUNT_AT_CART:
      return increaseAmountAtCart(state, action);
    case actionTypes.DECREASE_AMOUNT_AT_CART:
      return decreaseAmountAtCart(state, action);
    case actionTypes.START_LOADING:
      return startLoading(state, action);
    case actionTypes.RENDER_CONTACT_FORM:
      return renderContactForm(state, action);
    case actionTypes.UPDATE_CONTACT_FORM:
      return updateContactForm(state, action);
    case actionTypes.SUBMIT_ORDER_SUCCESS:
      return submitOrderSuccess(state, action);
    case actionTypes.ORDER_AGAIN:
      return orderAgain(state, action);
    default:
      return state;
  }
};

export default reducer;
