/* eslint-disable @typescript-eslint/no-explicit-any */
import { call, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import { LOGIN_REQUEST, loginSuccess, loginFailure, LoginRequestPayload } from '../actions/authActions';
import { AxiosResponse } from 'axios';

interface LoginResponse {
  jwt: string;
}

function loginApi({ username, password }: { username: string; password: string }) {
  return axios.post<LoginResponse>('http://localhost:8080/api/v1/auth/authenticate', { username, password });
}

function* loginSaga(action: { type: string; payload: LoginRequestPayload }) {
  try {
    const response: AxiosResponse<LoginResponse> = yield call(loginApi, action.payload);
    const token = response.data.jwt;
   
    localStorage.setItem('token', token);
    yield put(loginSuccess(token));
    action.payload.navigate('/');
  } catch (error: any) {
    yield put(loginFailure(error.response ? error.response.data : 'Error de conexión'));
  }
}

export default function* authSaga() {
  yield takeLatest(LOGIN_REQUEST, loginSaga);
}
