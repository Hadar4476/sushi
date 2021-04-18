import { put } from 'redux-saga/effects';
import axios from '../../myaxios';
import jwtDecode from 'jwt-decode';
import * as actions from '../actions';

const tokenKey = 'token';

export function* initMyOrdersSaga(action) {
  const token = yield localStorage.getItem(tokenKey);
  const user = yield jwtDecode(token);
  const headers = yield { 'x-auth-token': token };
  if (user) {
    try {
      const { data } = yield axios.get('/orders', {
        headers: headers,
      });
      yield put(actions.initMyOrdersSuccess(data));
    } catch (error) {
      yield put(actions.initMyOrdersFail(error.response.data));
    }
  }
}
