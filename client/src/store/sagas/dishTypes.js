import { put } from 'redux-saga/effects';
import axios from '../../myaxios';
import jwtDecode from 'jwt-decode';

import * as actions from '../actions';

const tokenKey = 'token';

export function* initSushiTypesSaga(action) {
  const token = yield localStorage.getItem(tokenKey);
  const headers = yield { 'x-auth-token': token };
  const user = yield jwtDecode(token);
  if (user) {
    try {
      const { data } = yield axios.get('dishTypes/sushiTypes', {
        headers: headers,
      });
      yield put(actions.initSushiTypesSuccess(data));
    } catch (error) {
      const errorMessage = error.response.data;
      yield put(actions.initSushiTypesFail(errorMessage));
    }
  }
}

export function* initVeganTypesSaga(action) {
  const token = yield localStorage.getItem(tokenKey);
  const headers = yield { 'x-auth-token': token };
  const user = yield jwtDecode(token);
  if (user) {
    try {
      const { data } = yield axios.get('dishTypes/veganTypes', {
        headers: headers,
      });
      yield put(actions.initVeganTypesSuccess(data));
    } catch (error) {
      const errorMessage = error.response.data;
      yield put(actions.initVeganTypesFail(errorMessage));
    }
  }
}
export function* initWokTypesSaga(action) {
  const token = yield localStorage.getItem(tokenKey);
  const headers = yield { 'x-auth-token': token };
  const user = yield jwtDecode(token);
  if (user) {
    try {
      const { data } = yield axios.get('dishTypes/wokTypes', {
        headers: headers,
      });
      yield put(actions.initWokTypesSuccess(data));
    } catch (error) {
      const errorMessage = error.response.data;
      yield put(actions.initWokTypesFail(errorMessage));
    }
  }
}

export function* searchForDishTypeSaga({ searchInput }) {
  const token = yield localStorage.getItem(tokenKey);
  const headers = yield { 'x-auth-token': token };
  const user = yield jwtDecode(token);
  if (user) {
    try {
      const { data } = yield axios.get(`dishTypes/search/${searchInput}`, {
        headers: headers,
      });
      yield put(actions.updateDishTypes(data));
    } catch (error) {
      return;
    }
  }
}
