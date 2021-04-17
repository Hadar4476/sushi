import { put } from 'redux-saga/effects';
import axios from '../../myaxios';
import jwtDecode from 'jwt-decode';
import * as actions from '../actions';

const tokenKey = 'token';

export function* submitOrderSaga({ order }) {
  const token = yield localStorage.getItem(tokenKey);
  const user = yield jwtDecode(token);
  const headers = yield { 'x-auth-token': token };
  if (user) {
    try {
      const { data } = yield axios.post('/orders', order, {
        headers: headers,
      });
      if (data) {
        yield put(actions.submitOrderSuccess());
      }
    } catch (error) {
      return;
    }
  }
}
