import { call, put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';
import { loginSuccess, /* loginFailure */ } from '../../store/auth/authSlice';


interface LoginPayload {
    username: string;
    password: string;
}

function* loginSaga(action: { type: string; payload: LoginPayload }) {

   

    try {
        const response = yield call(axios.post, 'http://localhost:8080/api/v1/auth/authenticate', action.payload);
        yield put(loginSuccess(response.data.jwt));

        localStorage.setItem("token", response.data.jwt);

       

    } catch (error) {
        console.log(error);
        // yield put(loginFailure('Login failed. Please try again.'));
    }
}

function* watchLoginSaga() {
    yield takeEvery('auth/loginRequest', loginSaga);
}

export default function* rootSaga() {
    yield watchLoginSaga();
}
