import { takeEvery, takeLatest } from 'redux-saga/effects';

import * as actionTypes from '../actions/actionTypes';

import { getAuthenticatedUserSaga, updateChangeSaga } from './user';
import {
  initSushiTypesSaga,
  initVeganTypesSaga,
  initWokTypesSaga,
  searchForDishTypeSaga,
} from './dishTypes';

import { submitOrderSaga } from './orderManager';
import { initMyOrdersSaga } from './myOrders';

export function* watchGetAuthenticatedUser() {
  yield takeLatest(actionTypes.GET_AUTH_USER, getAuthenticatedUserSaga);
}

export function* watchInitSushiTypes() {
  yield takeEvery(actionTypes.INIT_SUSHI_TYPES, initSushiTypesSaga);
}

export function* watchInitVeganTypes() {
  yield takeEvery(actionTypes.INIT_VEGAN_TYPES, initVeganTypesSaga);
}
export function* watchInitWokTypes() {
  yield takeEvery(actionTypes.INIT_WOK_TYPES, initWokTypesSaga);
}

export function* watchSearchForDishType() {
  yield takeLatest(actionTypes.SEARCH_FOR_DISH_TYPE, searchForDishTypeSaga);
}

export function* watchSubmitOrder() {
  yield takeLatest(actionTypes.SUBMIT_ORDER, submitOrderSaga);
}

export function* watchInitMyOrders() {
  yield takeEvery(actionTypes.INIT_MY_ORDERS, initMyOrdersSaga);
}
