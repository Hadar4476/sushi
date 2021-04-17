import { put } from 'redux-saga/effects';
import axios from '../../myaxios';
import jwtDecode from 'jwt-decode';
import * as actions from '../actions';

const tokenKey = 'token';

export function* getAuthenticatedUserSaga() {
  const token = yield localStorage.getItem(tokenKey);
  const user = yield jwtDecode(token);
  const headers = yield { 'x-auth-token': token };
  if (user) {
    try {
      const { data } = yield axios.get('/users/me', { headers: headers });
      yield put(actions.getAuthenticatedUserSuccess(data));
    } catch (error) {
      yield put(actions.getAuthenticatedUserSuccess(error.response.data));
    }
  }
}
